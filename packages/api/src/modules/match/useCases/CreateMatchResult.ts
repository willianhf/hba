import { Actor } from '~/modules/auth/domain';
import { PlayerRepository } from '~/modules/player/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { IUseCase, ValidationError } from '~/shared/core';
import { Match, MatchResult } from '../domain';
import { MatchResultRepository } from '../repos';

interface CreateMatchResultDTO {
  match: Match;
  homeScore: number;
  awayScore: number;
  playerOfTheMatch: Actor;
  referee: Actor;
  scorer: Actor;
  recorder?: Actor;
  videoReferee?: Actor;
  statsKeeper?: Actor;
}

type CreateMatchResultOutput = MatchResult;

export class CreateMatchResultUseCase implements IUseCase<CreateMatchResultDTO, CreateMatchResultOutput> {
  constructor(private readonly matchResultRepository: MatchResultRepository, private readonly seasonRepository: SeasonRepository, private readonly playerRepository: PlayerRepository) {}

  public async execute(dto: CreateMatchResultDTO): Promise<CreateMatchResultOutput> {
    const hasResult = await this.matchResultRepository.hasResult(dto.match.id);
    if (hasResult) {
      throw new ValidationError('Essa partida já possui um resultado atribuido');
    }

    const season = await this.seasonRepository.findCurrent();
    const playerOfTheMatch = await this.playerRepository.findActorActivePlayer(dto.playerOfTheMatch.id, season.id);
    if (!playerOfTheMatch) {
      throw new ValidationError('POTG informado não possui uma inscrição de jogador ativa');
    }

    const isWalkover = dto.homeScore === 0 && dto.awayScore === 0;
    const releasedAt = new Date();
    const matchResult = new MatchResult({
      match: dto.match,
      homeScore: dto.homeScore,
      awayScore: dto.awayScore,
      referee: dto.referee,
      scorer: dto.scorer,
      recorder: dto.recorder,
      videoReferee: dto.videoReferee,
      statsKeeper: dto.statsKeeper,
      playerOfTheMatch,
      releasedAt,
      isWalkover
    });

    await this.matchResultRepository.create(matchResult);

    return matchResult;
  }
}
