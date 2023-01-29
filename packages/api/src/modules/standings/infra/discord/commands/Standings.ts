import { PermissionGuard } from '@discordx/utilities';
import { CommandInteraction } from 'discord.js';
import { Discord, Guard, Slash, SlashGroup } from 'discordx';
import { createSeasonMatchesUseCase } from '~/modules/match/useCases';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { updateStandingsChannelUseCase } from '../useCases';

@Discord()
@SlashGroup({
  name: 'standings',
  description: 'Gerencia as classificações'
})
@SlashGroup('standings')
export class StandingsCommands {
  @Slash({ description: 'Gera as classificações da temporada' })
  @Guard(PermissionGuard(['Administrator'], { ephemeral: true }))
  async generate(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.reply(new MessageBuilder('Tabela de classificação gerada com sucesso').kind('SUCCESS').build());

      await createSeasonMatchesUseCase.execute();
      await updateStandingsChannelUseCase.execute();
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex);
      }
    }
  }
}
