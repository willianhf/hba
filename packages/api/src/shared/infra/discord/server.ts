import type { Interaction, Message } from 'discord.js';
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
    bot.once('ready', async () => {
      await bot.initApplicationCommands();
      this.onStart();
    });

    bot.on('interactionCreate', (interaction: Interaction) => {
      bot.executeInteraction(interaction);
    });

    bot.on('messageCreate', (message: Message) => {
      bot.executeCommand(message);
    });

    await bot.login(config.botToken);
  }
}

export const discordServer = new DiscordServer();
