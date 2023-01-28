import { Mapper } from '~/shared/core/Mapper';
import { ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedPlayerIcon, ToPersistPlayerIcon } from '../database';
import { PlayerIcon } from '../domain';
import { IconMapper } from './IconMapper';

export class PlayerIconMapper extends Mapper<PlayerIcon> {
  public static toPersist(domain: PlayerIcon): ToPersistPlayerIcon {
    return {
      iconId: domain.icon.id.toValue(),
      playerId: domain.playerId.toValue()
    };
  }

  public static toDomain(persisted: PersistedPlayerIcon): PlayerIcon {
    const playerId = new UniqueIdentifier(persisted.playerId);
    const icon = IconMapper.toDomain(persisted.icon);

    return new PlayerIcon({ icon, playerId }, new ComposedIdentifier({ iconId: icon.id, playerId }));
  }
}
