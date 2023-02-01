import { Actor } from '~/modules/auth/domain';
import { PlayerRepository } from '~/modules/player/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { IUseCase, ValidationError } from '~/shared/core';
import { MatchResult } from '../domain';
import { MatchResultRepository } from '../repos';

interface UpdateMatchResultDTO {
  result: MatchResult;
  homeScore: number;
  awayScore: number;
  playerOfTheMatch: Actor;
  referee: Actor;
  scorer: Actor;
  recorder?: Actor;
  videoReferee?: Actor;
  statsKeeper?: Actor;
}

type UpdateMatchResultOutput = MatchResult;

export class UpdateMatchResultUseCase implements IUseCase<UpdateMatchResultDTO, UpdateMatchResultOutput> {
  constructor(private readonly matchResultRepository: MatchResultRepository, private readonly seasonRepository: SeasonRepository, private readonly playerRepository: PlayerRepository) {}

  public async execute(dto: UpdateMatchResultDTO): Promise<UpdateMatchResultOutput> {
    const season = await this.seasonRepository.findCurrent();
    const playerOfTheMatch = await this.playerRepository.findActorActivePlayer(dto.playerOfTheMatch.id, season.id);
    if (!playerOfTheMatch) {
      throw new ValidationError('POTG informado não possui uma inscrição de jogador ativa');
    }

    const isWalkover = dto.homeScore === 0 && dto.awayScore === 0;
    const matchResult = new MatchResult({
      match: dto.result.match,
      homeScore: dto.homeScore,
      awayScore: dto.awayScore,
      referee: dto.referee,
      scorer: dto.scorer,
      recorder: dto.recorder,
      videoReferee: dto.videoReferee,
      statsKeeper: dto.statsKeeper,
      releasedAt: dto.result.releseadAt,
      playerOfTheMatch,
      isWalkover
    }, dto.result.id);

    await this.matchResultRepository.update(matchResult);

    return matchResult;
  }
}
