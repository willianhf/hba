import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, CommandInteraction, TextChannel } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { DiscordChannelCategory } from '~/modules/discord/domain';
import { setDiscordChannelCategoryUseCase } from '~/modules/discord/useCases';
import { MessageBuilder } from '~/shared/infra/discord';

@Discord()
@Guard(PermissionGuard(['Administrator']))
@SlashGroup({
  name: 'channel',
  description: 'Gerencia os canais'
})
export class DiscordChannelCommands {
  @Slash({ description: 'Define a categoria do canal' })
  @SlashGroup('channel')
  async set(
    @SlashChoice(...Object.values(DiscordChannelCategory))
    @SlashOption({
      description: 'Categoria do canal',
      name: 'category',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    category: keyof typeof DiscordChannelCategory,
    @SlashOption({
      description: 'Canal a definir a categoria, se não informado será usado o canal aonde a mensagem foi enviada',
      name: 'channel',
      type: ApplicationCommandOptionType.Channel
    })
    channel: TextChannel | null,
    interaction: CommandInteraction
  ): Promise<void> {
    if (!channel) {
      if (interaction.channel) {
        channel = interaction.channel as TextChannel;
      } else {
        interaction.reply(new MessageBuilder('Não foi possível encontrar o canal').kind('ERROR').build());
        return;
      }
    }

    await setDiscordChannelCategoryUseCase.execute({
      category,
      discordId: channel.id,
      name: channel.name
    });

    interaction.reply(new MessageBuilder('Canal definido com sucesso').kind('SUCCESS').build());
  }
}
