import { generateSeasonGames, upsertSeasonGames } from "../services/games.js";
import { resetResults } from "../services/results.js";
import {
  generateStandings,
  getStandingsChannel,
  getStandingsMessage,
  saveStandingsMessageId,
  type TeamStandings
} from "../services/standings.js";

function buildStandingRow(team: TeamStandings, index: number): string {
  return `| ${index + 1} | ${team.name.padEnd(24, " ")}| ${team.games}  | ${team.wins}  | ${team.losses}  | ${team.conferenceWins}-${team.conferenceLosses}  | ${team.winPercent} |  ${team.last.slice(-3).join("").padEnd(3, "-")}    |   |`;
}

async function buildStandingsMessage(): Promise<string> {
  const standings = await generateStandings();
  const east = standings.east.map(buildStandingRow).join("\n");
  const west = standings.west.map(buildStandingRow).join("\n");

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
`;
}

export async function upsertStandings(): Promise<void> {
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

  upsertSeasonGames();
}

export async function resetStandings() {
  await resetResults();
  await generateSeasonGames();

  upsertStandings();
}
