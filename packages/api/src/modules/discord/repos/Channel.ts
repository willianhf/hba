import { BaseRepository } from '~/shared/core';
import { DiscordChannel, DiscordChannelCategory } from '../domain';

export interface DiscordChannelRepository extends BaseRepository<DiscordChannel> {
  findByCategory: (category: DiscordChannelCategory) => Promise<DiscordChannel | null>;
  upsert: (discordChannel: DiscordChannel) => Promise<void>;
}
