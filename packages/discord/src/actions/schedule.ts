import { format } from "date-fns";
import { bold } from "discord.js";
import { getDailyScheduledGames, type ScheduleGame } from "../services/schedule.js";
import { getDailyLogChannel } from "../utils/channels.js";
import { changeTimezone } from "../utils/date.js";
import { getEmojiByName, getTeamEmoji } from "../utils/format.js";

const scheduledGameRow = (scheduledGame: ScheduleGame): string => {
  const timezones = {
    brazil: changeTimezone(new Date(scheduledGame.dateTime), "America/Sao_Paulo"),
    portugal: changeTimezone(new Date(scheduledGame.dateTime), "Europe/Lisbon"),
  };

  return bold(`${format(timezones.brazil, "HH:mm")} 🇧🇷 | ${format(timezones.portugal, "HH:mm")} 🇵🇹 - ${getTeamEmoji(scheduledGame.away)} vs. ${getTeamEmoji(scheduledGame.home)}`);
}

async function buildScheduledGamesMessage(): Promise<string> {
  const todayScheduledGames = await getDailyScheduledGames();
  const today = new Date();

  return `
@everyone
${bold("HBA | Season 21")} ${getEmojiByName("hba")} Jogos do Dia - ${format(today, "dd/MM")}

${todayScheduledGames.length > 0 ? 
  todayScheduledGames.map(scheduledGameRow).join("\n")
  : "📭 Nenhum jogo agendado"}
`;
}

export async function announceScheduledGames(): Promise<void> {
  const channel = getDailyLogChannel();
  const message = await buildScheduledGamesMessage();

  channel.send(message);
}
