import { SeasonId } from '~/modules/season/domain';
import { TeamId } from '~/modules/team/domain';
import { Mapper } from '~/shared/core/Mapper';
import { PersistedMatch } from '../database';
import { Match, MatchSeriesId } from '../domain';

export class MatchMapper extends Mapper<Match> {
  public static toDomain(persisted: PersistedMatch): Match {
    return new Match({
      seasonId: new SeasonId(persisted.seasonId),
      homeTeamId: new TeamId(persisted.homeTeamId),
      awayTeamId: new TeamId(persisted.awayTeamId),
      matchKind: persisted.matchKind,
      matchSeriesId: persisted.matchSeriesId ? new MatchSeriesId(persisted.matchSeriesId) : undefined,
      scheduledTo: persisted.scheduledTo ?? undefined
    });
  }

  public static toPersistence(match: Match): PersistedMatch {
    return {
      id: match.id.toValue(),
      seasonId: match.seasonId.toValue(),
      homeTeamId: match.homeTeamId.toValue(),
      awayTeamId: match.awayTeamId.toValue(),
      matchKind: match.kind,
      scheduledTo: match.scheduledTo ?? null,
      matchSeriesId: match.matchSeriesId?.toValue() ?? null
    };
  }
}
