import { DiscordChannelCategory } from '~/modules/discord/domain';
import { DiscordChannelRepository } from '~/modules/discord/repos';
import { MatchResult } from '~/modules/match/domain';
import { IUseCase, ValidationError } from '~/shared/core';
import { bot } from '~/shared/infra/discord/server';

interface AnnounceMatchResultDTO {
  matchResult: MatchResult;
}

type AnnounceMatchResultOutput = void;

export class AnnounceMatchResultUseCase implements IUseCase<AnnounceMatchResultDTO, AnnounceMatchResultOutput> {
  public constructor(private readonly discordChannelRepository: DiscordChannelRepository) {}

  public async execute(dto: AnnounceMatchResultDTO): Promise<AnnounceMatchResultOutput> {
    const resultsChannel = await this.discordChannelRepository.findByCategory(DiscordChannelCategory.RESULTS);
    if (!resultsChannel) {
      throw new ValidationError('Você precisa definir o canal de resultados');
    }

    const discordResultsChannel = await bot.channels.fetch(resultsChannel.discordId);
    if (!discordResultsChannel) {
      throw new ValidationError('Não foi possível encontrar o canal de resultados');
    }

    if (discordResultsChannel.isTextBased()) {
      discordResultsChannel.send(dto.matchResult.toDiscordMessage());
    }
  }
}
