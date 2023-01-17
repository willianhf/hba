import { DiscordChannelCategory } from '~/modules/discord/domain';
import { DiscordChannelRepository } from '~/modules/discord/repos';
import { SeasonMatches } from '~/modules/match/domain';
import { MatchRepository } from '~/modules/match/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { generateStandingsUseCase } from '~/modules/standings/useCases';
import { IUseCase, ValidationError } from '~/shared/core';
import { bot } from '~/shared/infra/discord/server';

interface UpdateStandingsChannelDTO {}

type UpdateStandingsChannelResult = any;

export class UpdateStandingsChannelUseCase
  implements IUseCase<UpdateStandingsChannelDTO, UpdateStandingsChannelResult>
{
  public constructor(
    private readonly discordChannelRepository: DiscordChannelRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly matchRepository: MatchRepository
  ) {}

  public async execute(): Promise<UpdateStandingsChannelResult> {
    const standingsChannel = await this.discordChannelRepository.findByCategory(DiscordChannelCategory.STANDINGS);
    if (!standingsChannel) {
      throw new ValidationError('Você precisa definir o canal de classificação');
    }

    const discordStandingsChannel = await bot.channels.fetch(standingsChannel.discordId);
    if (!discordStandingsChannel) {
      throw new ValidationError('Não foi possível encontrar o canal de classificação');
    }

    if (discordStandingsChannel.isTextBased()) {
      const messages = await discordStandingsChannel.messages.fetch();
      messages.forEach(message => message.delete());

      const season = await this.seasonRepository.findCurrent();
      const standings = await generateStandingsUseCase.execute({ season });
      await discordStandingsChannel.send(standings.getTable(season));

      const remainingMatches = await this.matchRepository.findRemaining(season.id);
      const seasonMatches = new SeasonMatches({ remainingMatches });
      await discordStandingsChannel.send(seasonMatches.getTable());
    }
  }
}
