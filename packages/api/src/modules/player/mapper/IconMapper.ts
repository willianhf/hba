import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedIcon, ToPersistIcon } from '../database';
import { Icon } from '../domain';

export class IconMapper extends Mapper<Icon> {
  public static toPersist(domain: Icon): ToPersistIcon {
    return {
      id: domain.id.toValue(),
      name: domain.name,
      category: domain.category,
      enabled: domain.enabled
    };
  }

  public static toDomain(persisted: PersistedIcon): Icon {
    return new Icon(persisted, new UniqueIdentifier(persisted.id));
  }
}
