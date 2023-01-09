import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Guard, Slash, SlashGroup, SlashOption } from 'discordx';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { createSeasonService } from '~/modules/season/services/CreateSeason';
import { makeSeasonCurrentService } from '~/modules/season/services/MakeSeasonCurrent';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';

@Discord()
@Guard(PermissionGuard(['Administrator']))
@SlashGroup({
  name: 'season',
  description: 'Gerencia as temporadas'
})
export class SeasonCommands {
  @Slash({ description: 'Cria uma nova temporada' })
  @SlashGroup('season')
  async create(
    @SlashOption({
      description: 'Número da temporada',
      name: 'season',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    season: string,
    @SlashOption({
      description: 'Definir como temporada atual',
      name: 'is_current',
      type: ApplicationCommandOptionType.Boolean
    })
    isCurrent: boolean | null,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await createSeasonService.execute({ name: season, isCurrent: !!isCurrent });

      interaction.reply(new MessageBuilder('Temporada criada com sucesso.').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Define a atual temporada' })
  @SlashGroup('season')
  async current(
    @SlashOption({
      description: 'Temporada',
      name: 'season',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    season: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await makeSeasonCurrentService.execute({ name: season });

      interaction.reply(new MessageBuilder(`Temporada ${season} definida como atual.`).kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Lista todas as temporadas' })
  @SlashGroup('season')
  async list(interaction: CommandInteraction): Promise<void> {
    try {
      const seasons = await prismaSeasonRepository.findAll();

      interaction.reply(
        new MessageBuilder()
          .codeBlock([
            'Lista de temporadas',
            '🚩️ = atual\n',
            ...seasons.map(season => `${season.isCurrent ? `🚩 ${season.name}` : `   ${season.name}`}`)
          ])
          .build()
      );
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }
}
