import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, CommandInteraction, Role } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { DiscordRoleCategory } from '~/modules/discord/domain';
import { setDiscordRoleCategoryUseCase } from '~/modules/discord/useCases';
import { MessageBuilder } from '~/shared/infra/discord';

@Discord()
@Guard(PermissionGuard(['Administrator']))
@SlashGroup({
  name: 'role',
  description: 'Gerencia os cargos'
})
export class DiscordRoleCommands {
  @Slash({ description: 'Define a categoria do cargo' })
  @SlashGroup('role')
  async set(
    @SlashChoice(...Object.values(DiscordRoleCategory))
    @SlashOption({
      description: 'Categoria do cargo',
      name: 'category',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    category: keyof typeof DiscordRoleCategory,
    @SlashOption({
      description: 'Cargo a definir a categoria',
      name: 'role',
      type: ApplicationCommandOptionType.Role,
      required: true
    })
    role: Role,
    interaction: CommandInteraction
  ): Promise<void> {
    await setDiscordRoleCategoryUseCase.execute({
      category,
      discordId: role.id,
      name: role.name
    });

    interaction.reply(new MessageBuilder('Cargo definido com sucesso.').kind('SUCCESS').build());
  }
}
