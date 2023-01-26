import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { DiscordActorFacade } from '~/modules/auth/infra/discord/facades/DiscordActor';
import { prismaDiscordActorRepository } from '~/modules/auth/repos/impl/prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus, Conference, NBATeam, Team, TeamId } from '~/modules/team/domain';
import { prismaNBATeamRepository, prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { applyTeamUseCase, changeTeamApprovalStatusUseCase } from '~/modules/team/useCases';
import { Pagination, ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { MessageBuilder } from '~/shared/infra/discord';
import { bot } from '~/shared/infra/discord/server';
import { teamsCache } from '../cache';

const TEAMS_PAGE_SIZE = 10;

@Discord()
@SlashGroup({
  name: 'team',
  description: 'Gerencia as equipes'
})
@SlashGroup('team')
export class TeamCommands {
  public constructor() {
    this.fetchNBATeams();
    this.fetchTeams(ApprovalStatus.IDLE);
  }

  private async fetchNBATeams(): Promise<void> {
    const nbaTeams = await prismaNBATeamRepository.findAll();
    teamsCache.set('nbaTeams', nbaTeams);
  }

  private async fetchTeams(status: ApprovalStatus): Promise<void> {
    const key = `teams:${status}`;
    if (teamsCache.has(key)) {
      return;
    }

    const season = await prismaSeasonRepository.findCurrent();
    const teams = await prismaTeamRepository.findByStatus(season.id, status);

    teamsCache.set(key, teams);
    teamsCache.set(`${key}:pages`, Pagination.totalPages(teams, TEAMS_PAGE_SIZE));
  }

  private async getTeamsPaginated(status: ApprovalStatus, page: number): Promise<Team[]> {
    await this.fetchTeams(status);

    return Pagination.paginate(teamsCache.getOr<Team[]>(`teams:${status}`, []), page, TEAMS_PAGE_SIZE);
  }

  private async getTeamsBySearch(status: ApprovalStatus, search: string | null): Promise<Team[]> {
    await this.fetchTeams(status);

    const teams = teamsCache.getOr<Team[]>(`teams:${status}`, []);
    if (search) {
      return teams
        .filter(team => team.nbaTeam.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, TEAMS_PAGE_SIZE);
    }

    return Pagination.paginate(teams, 0, TEAMS_PAGE_SIZE);
  }

  private async getApprovedTeams(): Promise<Team[]> {
    await this.fetchTeams(ApprovalStatus.ACCEPTED);

    return teamsCache.getOr<Team[]>(`teams:${ApprovalStatus.ACCEPTED}`, []);
  }

  private getTotalPages(status: ApprovalStatus): number {
    return teamsCache.getOr(`teams:${status}:pages`, 0);
  }

  private buildTeamsList(teams: Team[]): string[] {
    const biggestTeamName = Math.max(...teams.map(team => team.nbaTeam.name.length));

    return teams.map(team => team.toTeamRow(biggestTeamName));
  }

  @Slash({ description: 'Aplica-se para ser capitão de uma equipe' })
  async apply(
    @SlashChoice(...Object.keys(Conference))
    @SlashOption({
      description: 'Conferência',
      name: 'conference',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    _conference: Conference,
    @SlashOption({
      description: 'Equipe',
      name: 'team',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: TeamCommands, interaction: AutocompleteInteraction) {
        const conference = (interaction.options.getString('conference') as Conference | null) ?? Conference.EAST;
        const nbaTeams = teamsCache
          .getOr<NBATeam[]>('nbaTeams', [])
          .filter(nbaTeam => nbaTeam.conference === conference);

        interaction.respond(nbaTeams.map(team => ({ name: team.name, value: team.id.toValue() })));
      }
    })
    nbaTeamId: string,
    @SlashOption({
      description: 'Sub-capitão',
      name: 'co_captain',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    coCaptain: User,
    interaction: CommandInteraction
  ): Promise<void> {
    const captainActor = await DiscordActorFacade.findOrRegister(interaction.user, interaction.member);
    const coCaptainActor = await DiscordActorFacade.findOrRegister(coCaptain, interaction.guild);

    try {
      const team = await applyTeamUseCase.execute({
        captainActor: captainActor.actor,
        coCaptainActor: coCaptainActor.actor,
        nbaTeamId: new UniqueIdentifier(nbaTeamId)
      });

      teamsCache.invalidate(`teams:${ApprovalStatus.IDLE}`);

      coCaptain.send(
        `Você foi inscrito como sub-capitão da equipe ${team.nbaTeam.name} e ${team.roster.captain.habboUsername} como capitão.`
      );

      interaction.reply(new MessageBuilder('A inscrição da equipe foi enviada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Lista todas as inscrições de times da temporada' })
  async applications(
    @SlashOption({
      description: 'Página',
      name: 'page',
      type: ApplicationCommandOptionType.Integer,
      required: false
    })
    page: number | null,
    interaction: CommandInteraction
  ): Promise<void> {
    page = page ?? 0;

    const status = ApprovalStatus.IDLE;
    const teams = await this.getTeamsPaginated(status, page);
    const season = await prismaSeasonRepository.findCurrent();

    const teamsList = this.buildTeamsList(teams);

    interaction.reply(
      new MessageBuilder()
        .codeBlock([
          `Inscrições de times pendente (Temporada ${season.name}):\n`,
          ...teamsList,
          `\nPágina [${page}-${this.getTotalPages(status)}]`
        ])
        .build()
    );
  }

  @Slash({ description: 'Aprova um time para a temporada atual' })
  @Guard(PermissionGuard(['Administrator']))
  async accept(
    @SlashOption({
      description: 'Equipe',
      name: 'team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: TeamCommands, interaction: AutocompleteInteraction) {
        const input = interaction.options.getString('team_id');
        const teams = await this.getTeamsBySearch(ApprovalStatus.IDLE, input);
        const teamsList = await this.buildTeamsList(teams);

        interaction.respond(
          teamsList.map((team, index) => ({
            name: team,
            value: teams[index].id.toValue()
          }))
        );
      }
    })
    teamId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Time informado inválido').kind('ERROR').build());
        return;
      }

      await changeTeamApprovalStatusUseCase.execute({ team, status: ApprovalStatus.ACCEPTED });

      teamsCache.invalidate('teams');

      interaction.reply(new MessageBuilder('Equipe aprovada com sucesso').kind('SUCCESS').build());

      const captainActorDiscord = await prismaDiscordActorRepository.findByActorId(team.roster.captain.id);
      if (captainActorDiscord) {
        const season = await prismaSeasonRepository.findCurrent();
        const captainUser = await bot.users.fetch(captainActorDiscord.discordId);
        captainUser.send(
          `Sua inscrição da equipe ${team.nbaTeam.name} foi APROVADA para a temporada ${season.name} da HBA.`
        );
      }
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Recusa um time para a temporada atual' })
  @Guard(PermissionGuard(['Administrator']))
  async deny(
    @SlashOption({
      description: 'Equipe',
      name: 'team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: TeamCommands, interaction: AutocompleteInteraction) {
        const input = interaction.options.getString('team_id');
        const teams = await this.getTeamsBySearch(ApprovalStatus.IDLE, input);
        const teamsList = await this.buildTeamsList(teams);

        interaction.respond(
          teamsList.map((team, index) => ({
            name: team,
            value: teams[index].id.toValue()
          }))
        );
      }
    })
    teamId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Time informado inválido').kind('ERROR').build());
        return;
      }

      await changeTeamApprovalStatusUseCase.execute({ team, status: ApprovalStatus.DENIED });

      teamsCache.invalidate('teams');

      interaction.reply(new MessageBuilder('Equipe reprovada com sucesso').kind('SUCCESS').build());

      const captainActorDiscord = await prismaDiscordActorRepository.findByActorId(team.roster.captain.id);
      if (captainActorDiscord) {
        const season = await prismaSeasonRepository.findCurrent();
        const captainUser = await bot.users.fetch(captainActorDiscord.discordId);
        captainUser.send(
          `Sua inscrição da equipe ${team.nbaTeam.name} foi REPROVADA para a temporada ${season.name} da HBA.`
        );
      }
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Remove uma inscrição aprovada de equipe na temporada atual' })
  @Guard(PermissionGuard(['Administrator']))
  async remove(
    @SlashOption({
      description: 'Inscrição',
      name: 'team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: TeamCommands, interaction: AutocompleteInteraction) {
        const teams = await this.getApprovedTeams();
        const teamsList = await this.buildTeamsList(teams);

        interaction.respond(
          teamsList.map((team, index) => ({
            name: team,
            value: teams[index].id.toValue()
          }))
        );
      }
    })
    teamId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Time informado inválido').kind('ERROR').build());
        return;
      }

      await changeTeamApprovalStatusUseCase.execute({
        team,
        status: ApprovalStatus.DENIED
      });

      teamsCache.invalidate('teams');

      interaction.reply(new MessageBuilder('Inscrição do jogador removida com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }
}
