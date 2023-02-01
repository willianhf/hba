import { Events, Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import config from '~/config/index';
import { Server } from '~/shared/core';
import './commands';

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates
  ],
  silent: false
});

class DiscordServer extends Server {
  protected port(): number {
    return -1;
  }

  public async start(): Promise<void> {
    bot.once(Events.ClientReady, async () => {
      await bot.initApplicationCommands();
      this.onStart();
    });

    bot.on(Events.InteractionCreate, (interaction: Interaction) => {
      if (interaction.isCommand()) {
        console.log(
          `${interaction.user.username} executed /${interaction.commandName} ${interaction.options.data
            .map(option => option.name)
            .join(' ')}`
        );
      }
      bot.executeInteraction(interaction);
    });

    bot.on(Events.MessageCreate, (message: Message) => {
      bot.executeCommand(message);
    });

    await bot.login(config.botToken);
  }
}

export const discordServer = new DiscordServer();
