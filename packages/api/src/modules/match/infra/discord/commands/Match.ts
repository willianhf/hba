import { PermissionGuard } from '@discordx/utilities';
import { DiscordRoleCategory } from '@prisma/client';
import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { DiscordActorFacade } from '~/modules/auth/infra/discord/facades/DiscordActor';
import { RoleGuard } from '~/modules/discord/infra/discord/guards';
import { Match, MatchKind, MatchSeries } from '~/modules/match/domain';
import { prismaMatchRepository, prismaMatchSeriesRepository } from '~/modules/match/repos/impl/Prisma';
import { createMatchResultUseCase, createMatchUseCase } from '~/modules/match/useCases';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { updateStandingsChannelUseCase } from '~/modules/standings/infra/discord/useCases';
import { ApprovalStatus, Team, TeamId } from '~/modules/team/domain';
import { teamsCache } from '~/modules/team/infra/discord/cache';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { InMemoryCache, ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { announceMatchResultUseCase } from '../useCases';

@Discord()
@SlashGroup({
  name: 'match',
  description: 'Gerencia as partidas da temporada'
})
@SlashGroup('match')
export class MatchCommands {
  private readonly cache = new InMemoryCache();

  public constructor() {
    this.fetchRemainingMatches();
  }

  private async fetchRemainingMatches(): Promise<void> {
    if (this.cache.has('matches:remaining')) {
      return;
    }

    const season = await prismaSeasonRepository.findCurrent();
    const remainingMatches = await prismaMatchRepository.findRemaining(season.id);

    this.cache.set('matches:remaining', remainingMatches);
  }

  private async getRemainingMatches(): Promise<Match[]> {
    await this.fetchRemainingMatches();

    return this.cache.getOr<Match[]>('matches:remaining', []);
  }

  @Slash({ description: 'Cria uma partida na temporada' })
  @Guard(PermissionGuard(['Administrator'], { ephemeral: true }))
  async create(
    @SlashOption({
      description: 'Equipe casa',
      name: 'home_team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (interaction: AutocompleteInteraction) {
        const awayTeamId = interaction.options.getString('away_team_id');
        const teams = await teamsCache.getOr<Team[]>(`teams:${ApprovalStatus.ACCEPTED}`, []);
        interaction.respond(
          teams
            .filter(team => team.id.toValue() !== awayTeamId)
            .map(team => ({ name: team.toTeamRow(), value: team.id.toString() }))
        );
      }
    })
    homeTeamId: string,
    @SlashOption({
      description: 'Equipe visitante',
      name: 'away_team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (interaction: AutocompleteInteraction) {
        const homeTeamId = interaction.options.getString('home_team_id');
        const teams = await teamsCache.getOr<Team[]>(`teams:${ApprovalStatus.ACCEPTED}`, []);
        interaction.respond(
          teams
            .filter(team => team.id.toValue() !== homeTeamId)
            .map(team => ({ name: team.toTeamRow(), value: team.id.toString() }))
        );
      }
    })
    awayTeamId: string,
    @SlashChoice(...Object.values(MatchKind))
    @SlashOption({
      description: 'Tipo de partida',
      name: 'match_kind',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    matchKind: MatchKind,
    @SlashChoice(
      'EASTERN CONFERENCE SEMI-FINALS',
      'EASTERN CONFERENCE FINALS',
      'WESTERN CONFERENCE SEMI-FINALS',
      'WESTERN CONFERENCE FINALS',
      'THE FINALS'
    )
    @SlashOption({
      description: 'Nome da série de partidas',
      name: 'series_name',
      type: ApplicationCommandOptionType.String
    })
    seriesName: string | null,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      if (homeTeamId === awayTeamId) {
        throw new ValidationError('As equipes não podem ser as mesmas');
      }

      const homeTeam = await prismaTeamRepository.findById(new TeamId(homeTeamId));
      if (!homeTeam) {
        throw new ValidationError('Equipe da casa informada inválida');
      }

      const awayTeam = await prismaTeamRepository.findById(new TeamId(awayTeamId));
      if (!awayTeam) {
        throw new ValidationError('Equipe visitante informada inválida');
      }

      if (matchKind !== MatchKind.REGULAR && !seriesName) {
        throw new ValidationError('É obrigatório informar o nome da série dos jogos');
      }

      const season = await prismaSeasonRepository.findCurrent();
      let matchSeries = seriesName ? await prismaMatchSeriesRepository.findByName(season.id, seriesName) : undefined;
      if (seriesName && !matchSeries) {
        matchSeries = new MatchSeries({ name: seriesName, seasonId: season.id });
        await prismaMatchSeriesRepository.create(matchSeries);
      }

      await createMatchUseCase.execute({
        season,
        homeTeam,
        awayTeam,
        matchKind,
        matchSeries: matchSeries ?? undefined
      });

      this.cache.invalidate('matches');

      interaction.reply(new MessageBuilder('Partida criada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex);
      }
    }
  }

  @Slash({ description: 'Adiciona o resultado de uma partida' })
  @Guard(RoleGuard([DiscordRoleCategory.COUNCIL]))
  async result(
    @SlashOption({
      description: 'Partida',
      name: 'match_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: MatchCommands, interaction: AutocompleteInteraction) {
        const matches = await this.getRemainingMatches();
        interaction.respond(matches.map(match => ({ name: match.name, value: match.id.toValue() })));
      }
    })
    matchId: string,
    @SlashOption({
      description: 'Pontos time fora',
      name: 'away_score',
      type: ApplicationCommandOptionType.Integer,
      required: true
    })
    awayScore: number,
    @SlashOption({
      description: 'Pontos time casa',
      name: 'home_score',
      type: ApplicationCommandOptionType.Integer,
      required: true
    })
    homeScore: number,
    @SlashOption({
      description: 'POTG',
      name: 'potg',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: MatchCommands, interaction: AutocompleteInteraction) {
        const matchId = interaction.options.getString('match_id', true);
        const matches = await this.getRemainingMatches();
        const match = matches.find(match => match.id.toValue() === matchId);
        if (!match) {
          interaction.respond([]);
          return;
        }

        const teamActors = [...match.homeTeam.roster.getItems(), ...match.awayTeam.roster.getItems()];
        interaction.respond(
          teamActors.map(teamActor => ({
            name: teamActor.actor.habboUsername,
            value: teamActor.actor.id.toValue()
          }))
        );
      }
    })
    playerOfTheMatchId: string,
    @SlashOption({
      description: 'Árbitro',
      name: 'ref',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    referee: User,
    @SlashOption({
      description: 'Placar',
      name: 'scorer',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    scorer: User,
    @SlashOption({
      description: 'Recorder',
      name: 'recorder',
      type: ApplicationCommandOptionType.User
    })
    recorder: User | null,
    @SlashOption({
      description: 'VAR',
      name: 'var',
      type: ApplicationCommandOptionType.User
    })
    videoReferee: User | null,
    @SlashOption({
      description: 'Stats Keeper',
      name: 'stats_keeper',
      type: ApplicationCommandOptionType.User
    })
    statsKeeper: User | null,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      if (homeScore > 0 && awayScore > 0 && homeScore === awayScore) {
        throw new ValidationError('O placar não pode ser empate');
      }

      await interaction.deferReply({ ephemeral: true });

      const matches = await this.getRemainingMatches();
      const match = matches.find(match => match.id.toValue() === matchId);
      if (!match) {
        throw new ValidationError('Partida informada inválida');
      }

      const teamActors = [...match.homeTeam.roster.getItems(), ...match.awayTeam.roster.getItems()];
      const playerOfTheMatchActor = teamActors.find(
        teamActor => teamActor.actor.id.toValue() === playerOfTheMatchId
      )?.actor;
      if (!playerOfTheMatchActor) {
        throw new ValidationError('POTG informado inválido');
      }

      const refereeDiscordActor = await DiscordActorFacade.findOrRegister(referee, interaction.guild);
      const scorerDiscordActor = await DiscordActorFacade.findOrRegister(scorer, interaction.guild);
      const recorderDiscordActor = recorder
        ? await DiscordActorFacade.findOrRegister(recorder, interaction.guild)
        : null;
      const varDiscordActor = videoReferee
        ? await DiscordActorFacade.findOrRegister(videoReferee, interaction.guild)
        : null;
      const skDiscordActor = statsKeeper
        ? await DiscordActorFacade.findOrRegister(statsKeeper, interaction.guild)
        : null;

      const matchResult = await createMatchResultUseCase.execute({
        match,
        homeScore,
        awayScore,
        playerOfTheMatch: playerOfTheMatchActor,
        referee: refereeDiscordActor.actor,
        scorer: scorerDiscordActor.actor,
        recorder: recorderDiscordActor?.actor,
        videoReferee: varDiscordActor?.actor,
        statsKeeper: skDiscordActor?.actor
      });

      await Promise.all([announceMatchResultUseCase.execute({ matchResult }), updateStandingsChannelUseCase.execute()]);

      this.cache.invalidate('matches');

      interaction.editReply(new MessageBuilder('Resultado adicionado com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex);
      }
    }
  }
}
