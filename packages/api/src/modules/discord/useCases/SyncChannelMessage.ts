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
import { DiscordChannelCategory, DiscordChannelMessage } from '../domain';
import { DiscordChannelMessageRepository } from '../repos';

interface SyncChannelMessageDTO {
  season: Season;
  message: string;
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

type SyncChannelMessageResult = void;

export class SyncChannelMessageUseCase implements IUseCase<SyncChannelMessageDTO, SyncChannelMessageResult> {
  public constructor(private readonly discordChannelMessageRespository: DiscordChannelMessageRepository) {}

  public async execute(dto: SyncChannelMessageDTO): Promise<void> {
    const discordMessage = await dto.discordChannel.send(dto.message);
    const discordChannelMessage = new DiscordChannelMessage({
      category: dto.channelCategory,
      discordId: discordMessage.id,
      seasonId: dto.season.id
    });
    await this.discordChannelMessageRespository.create(discordChannelMessage);
  }
}
