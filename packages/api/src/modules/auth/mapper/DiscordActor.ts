import { Mapper } from '~/shared/core/Mapper';
import { PersistedDiscordActor, ToPersistDiscordActor } from '../database';
import { ActorId, DiscordActor, DiscordActorId } from '../domain';

export class DiscordActorMapper extends Mapper<DiscordActor> {
  public static toDomain(persisted: PersistedDiscordActor): DiscordActor {
    const actorId = new ActorId(persisted.actorId);

    return new DiscordActor({ discordId: persisted.discordId, actorId }, new DiscordActorId(persisted.discordId));
  }

  public static toPersist(domain: DiscordActor): ToPersistDiscordActor {
    return {
      discordId: domain.discordId,
      actor: {
        connect: {
          id: domain.actorId.toValue()
        }
      }
    };
  }
}
