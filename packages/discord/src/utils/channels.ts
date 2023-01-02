import { TextChannel } from "discord.js";
import { bot } from "../main.js";

export const DAILY_LOG_CHANNEL_ID = process.env.DAILY_LOG_CHANNEL_ID ?? "";

export function getDailyLogChannel(): TextChannel {
  const channel = bot.channels.cache.get(DAILY_LOG_CHANNEL_ID);
  if (!channel) {
    throw new Error("Couldn't find daily log channel");
  }

  return channel as TextChannel;
}

