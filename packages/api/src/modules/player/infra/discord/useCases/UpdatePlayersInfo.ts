import { DiscordChannelCategory } from '~/modules/discord/domain';
import { DiscordChannelRepository } from '~/modules/discord/repos';
import { deleteChannelMessagesUseCase, syncChannelMessageUseCase } from '~/modules/discord/useCases';
import { ApprovalStatus } from '~/modules/player/domain';
import { PlayerRepository } from '~/modules/player/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { Helpers, IUseCase, ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { bot } from '~/shared/infra/discord/server';
import { TextTable } from '~/shared/infra/discord/TextTable';

type UpdatePlayerInfoChannelDTO = void;

type UpdatePlayerInfoChannelResult = void;

export class UpdatePlayerInfoChannelUseCase
  implements IUseCase<UpdatePlayerInfoChannelDTO, UpdatePlayerInfoChannelResult>
{
  public constructor(
    private readonly discordChannelRepository: DiscordChannelRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly playerRepository: PlayerRepository
  ) {}

  public async execute(): Promise<void> {
    const channelCategory = DiscordChannelCategory.PLAYER_INFO;
    const domainChannel = await this.discordChannelRepository.findByCategory(channelCategory);
    if (!domainChannel) {
      throw new ValidationError('Você precisa definir o canal de player info`');
    }

    const discordChannel = await bot.channels.fetch(domainChannel.discordId);
    if (!discordChannel) {
      throw new ValidationError('Não foi possível encontrar o canal de player info');
    }

    if (discordChannel.isTextBased()) {
      const season = await this.seasonRepository.findCurrent();
      await deleteChannelMessagesUseCase.execute({ season, channelCategory, discordChannel });

      const players = await this.playerRepository.findByStatus(season.id, ApprovalStatus.ACCEPTED);

      const playersGrouped = Helpers.groupBy(players, player => player.position.image);

      for (const [iconImage, players] of Object.entries(playersGrouped)) {
        await syncChannelMessageUseCase.execute({
          channelCategory,
          season,
          discordChannel,
          message: '',
          files: [iconImage]
        });

        const table = new TextTable();
        players.forEach(player => {
          table.cell('Usuário', player.actor.habboUsername);
          table.cell('Jogador', player.nbaPlayer.name);
          table.cell('Ícones', `${player.icons.primaryIcon.id}/${player.icons.secondaryIcon.id}`);
        });

        await syncChannelMessageUseCase.execute({
          channelCategory,
          season,
          discordChannel,
          message: new MessageBuilder().codeBlock(table.render()).build().content
        });
      }

      await syncChannelMessageUseCase.execute({
        channelCategory,
        season,
        discordChannel,
        message: new MessageBuilder()
          .codeBlock('💲 PREÇOS DE MUDANÇA DE SUPERSTAR')
          .inlineCode('3 câmbios (3c) - mudança de star (A troca pode ser feita apenas na temporada regular)')
          .build().content
      });
    }
  }
}
