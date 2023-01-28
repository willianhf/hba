import { Season } from '~/modules/season/domain';
import { BaseRepository } from '~/shared/core';
import { DiscordChannelCategory, DiscordChannelMessage } from '../domain';

export interface DiscordChannelMessageRepository extends BaseRepository<DiscordChannelMessage> {
  findByCategory: (season: Season, category: DiscordChannelCategory) => Promise<DiscordChannelMessage[]>;
  deleteByCategory: (season: Season, category: DiscordChannelCategory) => Promise<void>;
}
