import {
  DMChannel,
  NewsChannel,
  PartialDMChannel,
  PrivateThreadChannel,
  PublicThreadChannel,
  TextChannel,
  VoiceChannel
} from 'discord.js';
import { Season } from '~/modules/season/domain';
import { IUseCase } from '~/shared/core';
import { DiscordChannelCategory } from '../domain';
import { DiscordChannelMessageRepository } from '../repos';

interface DeleteChannelMessagesDTO {
  season: Season;
  channelCategory: DiscordChannelCategory;
  discordChannel:
    | DMChannel
    | PartialDMChannel
    | NewsChannel
    | TextChannel
    | PrivateThreadChannel
    | PublicThreadChannel<boolean>
    | VoiceChannel;
}

type DeleteChannelMessagesResult = void;

export class DeleteChannelMessagesUseCase implements IUseCase<DeleteChannelMessagesDTO, DeleteChannelMessagesResult> {
  public constructor(private readonly discordChannelMessageRepository: DiscordChannelMessageRepository) {}

  public async execute(dto: DeleteChannelMessagesDTO): Promise<DeleteChannelMessagesResult> {
    const channelMessages = await this.discordChannelMessageRepository.findByCategory(dto.season, dto.channelCategory);

    try {
      await Promise.all(
        channelMessages.map(async channelMessage => {
          const discordChannelMessage = await dto.discordChannel.messages.fetch(channelMessage.discordId);
          if (discordChannelMessage) {
            await discordChannelMessage.delete();
          }
        })
      );

      await this.discordChannelMessageRepository.deleteByCategory(dto.season, dto.channelCategory);
    } catch (ex) {
      console.error(ex);
    }
  }
}
