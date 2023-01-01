import { getSeasonGames } from "../services/games.js";
import {
  generateStandings,
  getStandingsChannel,
  getStandingsMessage,
  saveStandingsMessageId,
  type TeamStandings
} from "../services/standings.js";
import { getTeamEmoji } from "../utils/format.js";

function buildStandingRow(team: TeamStandings, index: number): string {
  return `| ${index + 1} | ${team.name.padEnd(24, " ")}| ${team.games}  | ${team.wins}  | ${team.losses}  | ${team.conferenceWins}-${team.conferenceLosses}  | ${team.winPercent} |  ${team.last.slice(-3).join("").padEnd(3, "-")}    |   |`;
}

export async function buildStandingsMessage(): Promise<string> {
  const standings = await generateStandings();
  const east = standings.east.map(buildStandingRow).join("\n");
  const west = standings.west.map(buildStandingRow).join("\n");

  const seasonGames = await getSeasonGames();

  return `
:small_blue_diamond: Habbo Basketball Association :small_blue_diamond: Season 21 :small_blue_diamond:

\`\`\`md
# EASTERN CONFERENCE
\`\`\`\`\`\`
| # | Team                    | G  | W  | L  | CONF |  %   | LAST 3  | P |
|---+-------------------------+----+----+----+------+------+---------+---|
${east}
\`\`\`
\`\`\`cs
# WESTERN CONFERENCE
\`\`\`\`\`\`
| # | Team                    | G  | W  | L  | CONF |  %   | LAST 3  | P |
|---+-------------------------+----+----+----+------+------+---------+---|
${west}
\`\`\`\`\`\`
% - WIN PERCENTAGE | LAST 3 - LAST 3 GAMES | P - CLINCHED PLAYOFFS
\`\`\`
\`\`\`JOGOS RESTANTES\`\`\`
\`EASTERN CONFERENCE\`
${seasonGames.east.map(seasonGame => `${getTeamEmoji(seasonGame.away)} vs. ${getTeamEmoji(seasonGame.home)}`).join("\n")}

\`WESTERN CONFERENCE\`
${seasonGames.west.map(seasonGame => `${getTeamEmoji(seasonGame.away)} vs. ${getTeamEmoji(seasonGame.home)}`).join("\n")}

\`BETWEEN CONFERENCES\`
${seasonGames.west.map(seasonGame => `${getTeamEmoji(seasonGame.away)} vs. ${getTeamEmoji(seasonGame.home)}`).join("\n")}
`;
}

export async function upsertStandings() {
  const standingsChannel = getStandingsChannel();
  const message = await getStandingsMessage();
  const standingsMessage = await buildStandingsMessage();

  if (message) {
    message.edit(standingsMessage);
  } else {
    const sentMessage = await standingsChannel.send(standingsMessage);
    await saveStandingsMessageId(sentMessage);
  }

  console.log("✅ Standings update successfully");
}
