import { SeasonId } from '~/modules/season/domain';
import { Mapper } from '~/shared/core/Mapper';
import { PersistedDiscordChannelMessage, ToPersistDiscordChannelMessage } from '../database';
import { DiscordChannelMessage, DiscordChannelMessageId } from '../domain';

export class DiscordChannelMessageMapper extends Mapper<DiscordChannelMessage> {
  public static toDomain(persisted: PersistedDiscordChannelMessage): DiscordChannelMessage {
    return new DiscordChannelMessage(
      {
        category: persisted.category,
        discordId: persisted.discordId,
        seasonId: new SeasonId(persisted.seasonId)
      },
      new DiscordChannelMessageId(persisted.category)
    );
  }

  public static toPersistence(domain: DiscordChannelMessage): ToPersistDiscordChannelMessage {
    return {
      discordId: domain.discordId,
      category: domain.category,
      seasonId: domain.seasonId.toValue(),
    };
  }
}
