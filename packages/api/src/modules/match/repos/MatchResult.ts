import { SeasonId } from '~/modules/season/domain';
import { BaseRepository } from '~/shared/core';
import { MatchId, MatchResult } from '../domain';

export interface MatchResultRepository extends BaseRepository<MatchResult> {
  update(domain: MatchResult): Promise<void>;
  findBySeason(seasonId: SeasonId): Promise<MatchResult[]>;
  hasResult(matchId: MatchId): Promise<boolean>;
}
