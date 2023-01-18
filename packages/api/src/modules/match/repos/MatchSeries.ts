import { SeasonId } from '~/modules/season/domain';
import { BaseRepository } from '~/shared/core';
import { MatchSeries } from '../domain';

export interface MatchSeriesRepository extends BaseRepository<MatchSeries> {
  findByName(seasonId: SeasonId, name: string): Promise<MatchSeries | null>;
  findBySeason(seasonId: SeasonId): Promise<MatchSeries[]>
}
