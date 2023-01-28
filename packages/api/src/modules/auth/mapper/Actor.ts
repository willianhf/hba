import { Mapper } from '~/shared/core/Mapper';
import { PersistedActor, ToPersistActor } from '../database';
import { Actor, ActorId } from '../domain';

export class ActorMapper extends Mapper<Actor> {
  public static toDomain(persisted: PersistedActor): Actor {
    return new Actor({ habboUsername: persisted.habboUsername }, new ActorId(persisted.id));
  }

  public static toPersist(domain: Actor): ToPersistActor {
    return {
      id: domain.id.toValue(),
      habboUsername: domain.habboUsername
    };
  }
}
