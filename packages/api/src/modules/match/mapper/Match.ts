import { SeasonId } from '~/modules/season/domain';
import { TeamMapper } from '~/modules/team/mapper';
import { Mapper } from '~/shared/core/Mapper';
import { PersistedMatch, ToPersistMatch } from '../database';
import { Match, MatchId } from '../domain';
import { MatchSeriesMapper } from './MatchSeries';

export class MatchMapper extends Mapper<Match> {
  public static toDomain(persisted: PersistedMatch): Match {
    return new Match(
      {
        seasonId: new SeasonId(persisted.seasonId),
        homeTeam: TeamMapper.toDomain(persisted.homeTeam),
        awayTeam: TeamMapper.toDomain(persisted.awayTeam),
        matchKind: persisted.matchKind,
        matchSeries: persisted.series ? MatchSeriesMapper.toDomain(persisted.series) : undefined,
        scheduledTo: persisted.scheduledTo ?? undefined
      },
      new MatchId(persisted.id)
    );
  }

  public static toPersistence(match: Match): ToPersistMatch {
    return {
      id: match.id.toValue(),
      seasonId: match.seasonId.toValue(),
      homeTeamId: match.homeTeam.id.toValue(),
      awayTeamId: match.awayTeam.id.toValue(),
      matchKind: match.kind,
      scheduledTo: match.scheduledTo ?? null,
      matchSeriesId: match.matchSeries?.id?.toValue() ?? null
    };
  }
}
