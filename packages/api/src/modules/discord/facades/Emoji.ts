import { bot } from '~/shared/infra/discord/server';

export class DiscordEmojiFacade {
  public static getEmojiByName(name: string): string {
    return bot.emojis.cache.find(emoji => emoji.name === name)?.toString() ?? '';
  }
}
