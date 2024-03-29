import { DiscordChannelCategory } from '~/modules/discord/domain';
import { DiscordChannelRepository } from '~/modules/discord/repos';
import { deleteChannelMessagesUseCase, syncChannelMessageUseCase } from '~/modules/discord/useCases';
import { SeasonMatches } from '~/modules/match/domain';
import { MatchRepository } from '~/modules/match/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { generateStandingsUseCase } from '~/modules/standings/useCases';
import { IUseCase, ValidationError } from '~/shared/core';
import { bot } from '~/shared/infra/discord/server';

type UpdateStandingsChannelDTO = void;

type UpdateStandingsChannelResult = void;

export class UpdateStandingsChannelUseCase
  implements IUseCase<UpdateStandingsChannelDTO, UpdateStandingsChannelResult>
{
  public constructor(
    private readonly discordChannelRepository: DiscordChannelRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly matchRepository: MatchRepository
  ) {}

  public async execute(): Promise<UpdateStandingsChannelResult> {
    const channelCategory = DiscordChannelCategory.STANDINGS;
    const standingsChannel = await this.discordChannelRepository.findByCategory(channelCategory);
    if (!standingsChannel) {
      throw new ValidationError('Você precisa definir o canal de classificação');
    }

    const discordStandingsChannel = await bot.channels.fetch(standingsChannel.discordId);
    if (!discordStandingsChannel) {
      throw new ValidationError('Não foi possível encontrar o canal de classificação');
    }

    if (discordStandingsChannel.isTextBased()) {
      const season = await this.seasonRepository.findCurrent();
      await deleteChannelMessagesUseCase.execute({ season, channelCategory, discordChannel: discordStandingsChannel });

      const standings = await generateStandingsUseCase.execute({ season });
      await syncChannelMessageUseCase.execute({
        channelCategory,
        season,
        discordChannel: discordStandingsChannel,
        message: standings.getTable(season)
      });

      const remainingMatches = await this.matchRepository.findRemaining(season.id);
      const seasonMatches = new SeasonMatches({ remainingMatches });

      const regularSeason = seasonMatches.getRegularSeason();
      if (regularSeason) {
        await syncChannelMessageUseCase.execute({
          channelCategory,
          season,
          discordChannel: discordStandingsChannel,
          message: regularSeason
        });
      }

      const playoffsBracket = seasonMatches.getPlayoffsBracket();
      if (playoffsBracket) {
        await syncChannelMessageUseCase.execute({
          channelCategory,
          season,
          discordChannel: discordStandingsChannel,
          message: playoffsBracket
        });
      }
    }
  }
}
