import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashGroup, SlashOption } from 'discordx';
import { ActorId } from '~/modules/auth/domain';
import { DiscordActorFacade } from '~/modules/auth/infra/discord/facades/DiscordActor';
import { prismaActorRepository } from '~/modules/auth/repos/impl/prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus, Team, TeamId } from '~/modules/team/domain';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { addActorToRosterUseCase, removeActorFromRosterUseCase } from '~/modules/team/useCases';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { teamsCache } from '../cache';

const ACCEPTED_TEAMS_CACHE_KEY = `teams:${ApprovalStatus.ACCEPTED}`;

@Discord()
@SlashGroup({
  name: 'roster',
  description: 'Gerencia o elenco das equipes',
  root: 'team'
})
@SlashGroup('roster', 'team')
export class RosterCommands {
  public constructor() {
    this.fetchTeams();
  }

  private async fetchTeams(): Promise<void> {
    if (teamsCache.has(ACCEPTED_TEAMS_CACHE_KEY)) {
      return;
    }

    const season = await prismaSeasonRepository.findCurrent();
    const teams = await prismaTeamRepository.findByStatus(season.id, ApprovalStatus.ACCEPTED);
    teamsCache.set(ACCEPTED_TEAMS_CACHE_KEY, teams);
  }

  private async getTeams(): Promise<Team[]> {
    await this.fetchTeams();

    return teamsCache.getOr<Team[]>(ACCEPTED_TEAMS_CACHE_KEY, []);
  }

  private buildTeamsList(teams: Team[]): string[] {
    return teams.map(
      team => `${team.nbaTeam.name} | © ${team.roster.captain.habboUsername} & ${team.roster.coCaptain.habboUsername}`
    );
  }

  private buildTeamRoster(team: Team): string[] {
    return [
      `© ${team.roster.captain.habboUsername}`,
      `s ${team.roster.coCaptain.habboUsername}`,
      ...team.roster.players.map(teamActor => `  ${teamActor.actor.habboUsername}`),
      '\n© = Capitão | s = Sub-capitão'
    ];
  }

  @Slash({ description: 'Adiciona um jogador ao elenco de uma equipe' })
  @Guard(PermissionGuard(['Administrator']))
  async add(
    @SlashOption({
      name: 'team_id',
      description: 'Equipe',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: RosterCommands, interaction: AutocompleteInteraction) {
        const teams = await this.getTeams();
        const teamsList = this.buildTeamsList(teams);

        interaction.respond(teamsList.map((team, index) => ({ name: team, value: teams[index].id.toValue() })));
      }
    })
    teamId: string,
    @SlashOption({
      name: 'player_id',
      description: 'Jogador',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    player: User,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Equipe informada inválida').kind('ERROR').build());
        return;
      }

      const playerDiscordActor = await DiscordActorFacade.findOrRegister(player, interaction.guild);

      await addActorToRosterUseCase.execute({ actor: playerDiscordActor.actor, team });

      teamsCache.invalidate(ACCEPTED_TEAMS_CACHE_KEY);

      // TODO: Update teams channel

      const roster = this.buildTeamRoster(team);
      interaction.reply(
        new MessageBuilder('Jogador adicionado ao elenco com sucesso')
          .codeBlock([team.nbaTeam.name, '', ...roster])
          .kind('SUCCESS')
          .build()
      );
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Remove um jogador do elenco de uma equipe' })
  @Guard(PermissionGuard(['Administrator']))
  async remove(
    @SlashOption({
      name: 'team_id',
      description: 'Equipe',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: RosterCommands, interaction: AutocompleteInteraction) {
        const teams = await this.getTeams();
        const teamsList = this.buildTeamsList(teams);

        interaction.respond(teamsList.map((team, index) => ({ name: team, value: teams[index].id.toValue() })));
      }
    })
    teamId: string,
    @SlashOption({
      name: 'player_id',
      description: 'Jogador',
      required: true,
      type: ApplicationCommandOptionType.String,
      autocomplete: async function (this: RosterCommands, interaction: AutocompleteInteraction) {
        const teams = await this.getTeams();
        const teamId = interaction.options.getString('team_id');
        const team = teams.find(team => team.id.toValue() === teamId);
        if (!team) {
          return;
        }

        interaction.respond(
          team.roster.players.map(teamActor => ({
            name: teamActor.actor.habboUsername,
            value: teamActor.actor.id.toValue()
          }))
        );
      }
    })
    actorId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Equipe informada inválida').kind('ERROR').build());
        return;
      }

      const actor = await prismaActorRepository.findById(new ActorId(actorId));
      if (!actor) {
        interaction.reply(new MessageBuilder('Jogador informado inválido').kind('ERROR').build());
        return;
      }

      await removeActorFromRosterUseCase.execute({ actor, team });

      teamsCache.invalidate(ACCEPTED_TEAMS_CACHE_KEY);

      // TODO: Update teams channel

      const roster = this.buildTeamRoster(team);
      interaction.reply(
        new MessageBuilder('Jogador removeido do elenco com sucesso')
          .codeBlock([team.nbaTeam.name, '', ...roster])
          .kind('SUCCESS')
          .build()
      );
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Lista o elenco de uma equipe' })
  async list(
    @SlashOption({
      name: 'team_id',
      description: 'Equipe',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: RosterCommands, interaction: AutocompleteInteraction) {
        const teams = await this.getTeams();
        const teamsList = this.buildTeamsList(teams);

        interaction.respond(teamsList.map((team, index) => ({ name: team, value: teams[index].id.toValue() })));
      }
    })
    teamId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    const teams = await this.getTeams();
    const team = teams.find(team => team.id.equals(new TeamId(teamId)));
    if (!team) {
      interaction.reply(new MessageBuilder('Equipe informada inválida').kind('ERROR').build());
      return;
    }

    const roster = this.buildTeamRoster(team);
    interaction.reply(new MessageBuilder().codeBlock([team.nbaTeam.name, '', ...roster]).build());
  }
}
