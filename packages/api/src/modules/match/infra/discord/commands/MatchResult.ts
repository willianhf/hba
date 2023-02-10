import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashGroup, SlashOption } from 'discordx';
import { DiscordActorFacade } from '~/modules/auth/infra/discord/facades/DiscordActor';
import { DiscordRoleCategory } from '~/modules/discord/domain';
import { RoleGuard } from '~/modules/discord/infra/discord/guards';
import { Match, MatchResult } from '~/modules/match/domain';
import { prismaMatchRepository, prismaMatchResultRepository } from '~/modules/match/repos/impl/Prisma';
import { createMatchResultUseCase, updateMatchResultUseCase } from '~/modules/match/useCases';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { updateStandingsChannelUseCase } from '~/modules/standings/infra/discord/useCases';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { cache } from '../cache';
import { announceMatchResultUseCase } from '../useCases';

@Discord()
@SlashGroup({
  root: 'match',
  name: 'result',
  description: 'Gerencia os resultados das partidas'
})
@SlashGroup('result', 'match')
export class MatchResultCommands {
  public constructor() {
    this.fetchMatchesResult();
    this.fetchRemainingMatches();
  }

  private async fetchMatchesResult(): Promise<void> {
    if (cache.has('matches:results')) {
      return;
    }

    const season = await prismaSeasonRepository.findCurrent();
    const matchesResult = await prismaMatchResultRepository.findBySeason(season.id);

    cache.set('matches:results', matchesResult);
  }

  private async getMatchesResult(): Promise<MatchResult[]> {
    await this.fetchMatchesResult();

    return cache.getOr<MatchResult[]>('matches:results', []);
  }


  private async fetchRemainingMatches(): Promise<void> {
    if (cache.has('matches:remaining')) {
      return;
    }

    const season = await prismaSeasonRepository.findCurrent();
    const remainingMatches = await prismaMatchRepository.findRemaining(season.id);

    cache.set('matches:remaining', remainingMatches);
  }

  private async getRemainingMatches(): Promise<Match[]> {
    await this.fetchRemainingMatches();

    return cache.getOr<Match[]>('matches:remaining', []);
  }

  @Slash({ description: 'Adiciona o resultado de uma partida' })
  @Guard(RoleGuard([DiscordRoleCategory.COUNCIL]))
  async add(
    @SlashOption({
      description: 'Partida',
      name: 'match_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: MatchResultCommands, interaction: AutocompleteInteraction) {
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
      autocomplete: async function (this: MatchResultCommands, interaction: AutocompleteInteraction) {
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
      await interaction.deferReply({ ephemeral: true });
      
      if (homeScore === awayScore) {
        throw new ValidationError('O placar não pode ser empate');
      }

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

      cache.invalidate('matches');

      interaction.editReply(new MessageBuilder('Resultado adicionado com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex);
      }
    }
  }

  @Slash({ description: 'Edita o resultado de uma partida' })
  @Guard(RoleGuard([DiscordRoleCategory.COUNCIL]))
  async edit(
    @SlashOption({
      description: 'Resultado',
      name: 'match_result_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: MatchResultCommands, interaction: AutocompleteInteraction) {
        const results = await this.getMatchesResult();
        interaction.respond(results.map(result => ({ name: result.name, value: result.id.toValue() })));
      }
    })
    matchResultId: string,
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
      autocomplete: async function (this: MatchResultCommands, interaction: AutocompleteInteraction) {
        const matchResultId = interaction.options.getString('match_result_id', true);
        const results = await this.getMatchesResult();
        const result = results.find(match => match.id.toValue() === matchResultId);
        if (!result) {
          interaction.respond([]);
          return;
        }

        const teamActors = [...result.match.homeTeam.roster.getItems(), ...result.match.awayTeam.roster.getItems()];
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
      await interaction.deferReply({ ephemeral: true });

      if (homeScore > 0 && awayScore > 0 && homeScore === awayScore) {
        throw new ValidationError('O placar não pode ser empate');
      }

      const results = await this.getMatchesResult();
      const result = results.find(result => result.id.toValue() === matchResultId);
      if (!result) {
        throw new ValidationError('Resultado informado inválido');
      }

      const teamActors = [...result.match.homeTeam.roster.getItems(), ...result.match.awayTeam.roster.getItems()];
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

      const matchResult = await updateMatchResultUseCase.execute({
        result,
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

      cache.invalidate('matches:results');

      interaction.editReply(new MessageBuilder('Resultado editado com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        interaction.editReply(new MessageBuilder('Algo deu errado contate um administrador').kind('ERROR').build());
        console.error(ex);
      }
    }
  }
}
