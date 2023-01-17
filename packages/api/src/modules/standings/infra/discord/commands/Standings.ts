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
  @Guard(PermissionGuard(['Administrator']))
  async generate(interaction: CommandInteraction): Promise<void> {
    try {
      interaction.deferReply();

      await createSeasonMatchesUseCase.execute();
      await updateStandingsChannelUseCase.execute();

      interaction.editReply(new MessageBuilder('Tabela de classificação gerada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex)
      }
    }
  }
}
