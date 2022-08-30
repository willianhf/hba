import { Mapper } from '~/shared/core/Mapper';
import { PersistedMatchSeries } from '../database';
import { MatchSeries, MatchSeriesId } from '../domain';

export class MatchSeriesMapper implements Mapper<MatchSeries> {
  public static toDomain(persisted: PersistedMatchSeries): MatchSeries {
    return new MatchSeries(
      {
        name: persisted.name
      },
      new MatchSeriesId(persisted.id)
    );
  }

  public static toPersistence(matchSeries: MatchSeries): PersistedMatchSeries {
    return {
      id: matchSeries.id.toValue(),
      name: matchSeries.name
    };
  }
}
