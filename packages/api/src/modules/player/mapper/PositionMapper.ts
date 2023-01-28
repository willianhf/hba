import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedPosition, ToPersistPosition } from '../database';
import { Position } from '../domain';

export class PositionMapper extends Mapper<Position> {
  public static toPersist(domain: Position): ToPersistPosition {
    return {
      id: domain.id.toValue(),
      name: domain.name
    };
  }

  public static toDomain(persisted: PersistedPosition): Position {
    return new Position(persisted, new UniqueIdentifier(persisted.id));
  }
}
