import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { DiscordActorFacade } from '~/modules/auth/infra/discord/facades/DiscordActor';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus, Conference, NBATeam, Team, TeamId } from '~/modules/team/domain';
import { prismaNBATeamRepository, prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { applyTeamUseCase, changeTeamApprovalStatusUseCase } from '~/modules/team/useCases';
import { Pagination, ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { MessageBuilder } from '~/shared/infra/discord';
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

  private async getApprovedTeams(): Promise<Team[]> {
    await this.fetchTeams(ApprovalStatus.ACCEPTED);

    return teamsCache.getOr<Team[]>(`teams:${ApprovalStatus.ACCEPTED}`, []);
  }

  private buildTeamsList(teams: Team[]): string[] {
    const biggestTeamName = Math.max(...teams.map(team => team.nbaTeam.name.length));

    return teams.map(team => team.toTeamRow(biggestTeamName));
  }

  @Slash({ description: 'Adiciona uma equipe a temporada' })
  @Guard(PermissionGuard(['Administrator'], { ephemeral: true }))
  async add(
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
      description: 'Capitão',
      name: 'captain',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    captain: User,
    @SlashOption({
      description: 'Sub-capitão',
      name: 'co_captain',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    coCaptain: User,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });

      const captainActor = await DiscordActorFacade.findOrRegister(captain, interaction.guild);
      const coCaptainActor = await DiscordActorFacade.findOrRegister(coCaptain, interaction.guild);

      await applyTeamUseCase.execute({
        captainActor: captainActor.actor,
        coCaptainActor: coCaptainActor.actor,
        nbaTeamId: new UniqueIdentifier(nbaTeamId)
      });

      teamsCache.invalidate(`teams:${ApprovalStatus.ACCEPTED}`);

      interaction.editReply(new MessageBuilder('Equipe adicionada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Remove uma inscrição aprovada de equipe na temporada atual' })
  @Guard(PermissionGuard(['Administrator'], { ephemeral: true }))
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
      await interaction.deferReply({ ephemeral: true });

      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        throw new ValidationError('Equipe informada inválido');
      }

      await changeTeamApprovalStatusUseCase.execute({
        team,
        status: ApprovalStatus.DENIED
      });

      teamsCache.invalidate('teams');

      interaction.editReply(new MessageBuilder('Inscrição da equipe removida com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }
}
