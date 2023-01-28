import { ActorMapper } from '~/modules/auth/mapper';
import { PlayerMapper } from '~/modules/player/mapper';
import { Mapper } from '~/shared/core/Mapper';
import { PersistedMatchResult, ToPersistMatchResult } from '../database';
import { MatchResult, MatchResultId } from '../domain';
import { MatchMapper } from './Match';

export class MatchResultMapper extends Mapper<MatchResult> {
  public static toDomain(persisted: PersistedMatchResult): MatchResult {
    return new MatchResult(
      {
        homeScore: persisted.homeScore,
        awayScore: persisted.awayScore,
        releasedAt: persisted.releasedAt,
        isWalkover: persisted.isWalkover,
        playerOfTheMatch: PlayerMapper.toDomain(persisted.playerOfTheMatch),
        referee: ActorMapper.toDomain(persisted.referee),
        scorer: ActorMapper.toDomain(persisted.scorer),
        recorder: persisted.recorder ? ActorMapper.toDomain(persisted.recorder) : undefined,
        videoReferee: persisted.videoReferee ? ActorMapper.toDomain(persisted.videoReferee) : undefined,
        statsKeeper: persisted.statsKeeper ? ActorMapper.toDomain(persisted.statsKeeper) : undefined,
        match: MatchMapper.toDomain(persisted.match)
      },
      new MatchResultId(persisted.matchId)
    );
  }

  public static toPersistence(matchResult: MatchResult): ToPersistMatchResult {
    return {
      matchId: matchResult.match.id.toValue(),
      homeScore: matchResult.homeScore,
      awayScore: matchResult.awayScore,
      releasedAt: matchResult.releseadAt,
      isWalkover: matchResult.isWalkover,
      playerOfTheMatchId: matchResult.playerOfTheMatch.id.toValue(),
      refereeId: matchResult.referee.id.toValue(),
      scorerId: matchResult.scorer.id.toValue(),
      recorderId: matchResult.recorder?.id.toValue(),
      videoRefereeId: matchResult.videoReferee?.id.toValue(),
      statsKeeperId: matchResult.statsKeeper?.id.toValue()
    };
  }
}
