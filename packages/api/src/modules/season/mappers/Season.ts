import { Mapper } from '~/shared/core/Mapper';
import { IncIdentifier } from '~/shared/domain';
import { PersistedSeason, ToPersistSeason } from '../database';
import { Season } from '../domain/Season';

export class SeasonMapper extends Mapper<Season> {
  public static toPersistence(domain: Season): ToPersistSeason {
    return {
      name: domain.name,
      isCurrent: domain.isCurrent
    };
  }

  public static toDomain(persisted: PersistedSeason): Season {
    return new Season(
      {
        name: persisted.name,
        isCurrent: persisted.isCurrent
      },
      new IncIdentifier(persisted.id)
    );
  }
}
