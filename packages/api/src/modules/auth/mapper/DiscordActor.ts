import { Mapper } from '~/shared/core/Mapper';
import { PersistedDiscordActor, ToPersistDiscordActor } from '../database';
import { DiscordActor, DiscordActorId } from '../domain';
import { ActorMapper } from './Actor';

export class DiscordActorMapper extends Mapper<DiscordActor> {
  public static toDomain(persisted: PersistedDiscordActor): DiscordActor {
    return new DiscordActor(
      { discordId: persisted.discordId, actor: ActorMapper.toDomain(persisted.actor) },
      new DiscordActorId(persisted.discordId)
    );
  }

  public static toPersist(domain: DiscordActor): ToPersistDiscordActor {
    return {
      discordId: domain.discordId,
      actor: {
        connect: {
          id: domain.actor.id.toValue()
        }
      }
    };
  }
}
