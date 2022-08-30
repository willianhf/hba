import { SeasonId } from '~/modules/season/domain';
import { BaseRepository } from '~/shared/core';
import { Match } from '../domain';

export interface MatchRepository extends BaseRepository<Match> {
  findBySeason: (seasonId: SeasonId) => Promise<Match[]>;
}
