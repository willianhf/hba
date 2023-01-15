import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { createDiscordActor } from '~/modules/auth/useCases';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';

@Discord()
export class AuthCommands {
  @Slash({ description: 'Registra-se como membro na liga' })
  async register(interaction: CommandInteraction): Promise<void> {
    if (!interaction.member || !('displayName' in interaction.member)) {
      interaction.reply(new MessageBuilder('Não é possível realizar o seu registro').kind('ERROR').build());
      return;
    }

    try {
      await createDiscordActor.execute({
        discordId: interaction.user.id,
        habboUsername: interaction.member.displayName
      });

      interaction.reply(new MessageBuilder('Registro realizado com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }
}
