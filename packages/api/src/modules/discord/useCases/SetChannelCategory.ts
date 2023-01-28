import { IUseCase } from '~/shared/core';
import { DiscordChannel, DiscordChannelCategory } from '../domain';
import { DiscordChannelRepository } from '../repos';

interface SetDiscordChannelCategoryDTO {
  discordId: string;
  name: string;
  category: DiscordChannelCategory;
}

type SetDiscordChannelCategoryResult = DiscordChannel;

export class SetDiscordChannelCategoryUseCase
  implements IUseCase<SetDiscordChannelCategoryDTO, SetDiscordChannelCategoryResult>
{
  constructor(private readonly discordChannelRepository: DiscordChannelRepository) {}

  public async execute(dto: SetDiscordChannelCategoryDTO): Promise<SetDiscordChannelCategoryResult> {
    const discordChannel = new DiscordChannel(dto);
    await this.discordChannelRepository.upsert(discordChannel);

    return discordChannel;
  }
}
