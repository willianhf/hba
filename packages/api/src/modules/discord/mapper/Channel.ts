import { Mapper } from '~/shared/core/Mapper';
import { PersistedDiscordChannel, ToPersistDiscordChannel } from '../database';
import { DiscordChannel, DiscordChannelId } from '../domain';

export class DiscordChannelMapper extends Mapper<DiscordChannel> {
  public static toDomain(persisted: PersistedDiscordChannel): DiscordChannel {
    return new DiscordChannel(
      {
        category: persisted.category,
        discordId: persisted.discordId,
        name: persisted.name
      },
      new DiscordChannelId(persisted.category)
    );
  }

  public static toPersistence(discordChannel: DiscordChannel): ToPersistDiscordChannel {
    return {
      name: discordChannel.name,
      discordId: discordChannel.discordId,
      category: discordChannel.category
    };
  }
}
