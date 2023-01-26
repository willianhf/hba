import { SeasonId } from '~/modules/season/domain';
import { BaseRepository } from '~/shared/core';
import { MatchId, MatchResult } from '../domain';

export interface MatchResultRepository extends BaseRepository<MatchResult> {
  findBySeason(seasonId: SeasonId): Promise<MatchResult[]>;
  hasResult(matchId: MatchId): Promise<boolean>;
}
