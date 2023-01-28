import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashGroup, SlashOption } from 'discordx';
import { prismaActorRepository } from '~/modules/auth/repos/impl/prisma';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { DiscordActorFacade } from '../facades/DiscordActor';

@Discord()
@SlashGroup({
  name: 'user',
  description: 'Gerencia os usuários'
})
@SlashGroup('user')
export class UserCommands {
  @Slash({ description: 'Atualiza informações do usuário' })
  @Guard(PermissionGuard(['Administrator'], { ephemeral: true }))
  async update(
    @SlashOption({
      description: 'Membro',
      name: 'user',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    user: User,
    @SlashOption({
      description: 'Usuário',
      name: 'username',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    username: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });

      const discordActor = await DiscordActorFacade.findOrRegister(user, interaction.guild);
      discordActor.actor.setHabboUsername(username);

      await prismaActorRepository.update(discordActor.actor);

      interaction.editReply(new MessageBuilder('Usuário atualizado com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        interaction.editReply(
          new MessageBuilder('Alguma coisa deu errado, contate algum administrador').kind('ERROR').build()
        );
        console.error(ex);
      }
    }
  }
}
