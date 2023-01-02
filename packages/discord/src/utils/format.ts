import { bot } from "../main.js";
import { Team } from "../services/teams.js";

export function formatWinPercent(number: number): string {
  const characters = number.toFixed(3).split("");

  if (characters.at(0) === "1") {
    characters.pop();
  } else {
    characters.shift();
  }

  return characters.join("");
}

export function getEmojiByName(name: string): string {
  return bot.emojis.cache.find(emoji => emoji.name === name)?.toString() ?? "";
}

export function getTeamEmoji(team: Team): string {
  return getEmojiByName(team.emoji);
}
