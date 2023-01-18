import { SeasonId } from '~/modules/season/domain';
import { Team } from '~/modules/team/domain';
import { BaseRepository } from '~/shared/core';
import { Match, MatchKind } from '../domain';

export interface MatchRepository extends BaseRepository<Match> {
  findBySeason(seasonId: SeasonId): Promise<Match[]>;
  createMany(matches: Match[]): Promise<void>;
  findRemaining(seasonId: SeasonId): Promise<Match[]>;
  exists(seasonId: SeasonId, teamA: Team, teamB: Team, kind: MatchKind): Promise<boolean>;
}
