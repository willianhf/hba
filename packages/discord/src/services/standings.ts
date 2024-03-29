import { Message, TextChannel } from "discord.js";
import dotenv from "dotenv";
import { db } from "../db.js";
import { bot } from "../main.js";
import { getResults } from "./results.js";
import { Team, seasonTeams } from "./teams.js";
import { formatWinPercent } from "../utils/format.js";

dotenv.config();

export const STANDINGS_CHANNEL_ID = process.env.STANDINGS_CHANNEL_ID ?? '';

export function getStandingsChannel(): TextChannel {
  const channel = bot.channels.cache.get(STANDINGS_CHANNEL_ID);
  if (!channel) {
    throw new Error("Couldn't find standings channel");
  }

  return channel as TextChannel;
}

export async function getStandingsMessage(): Promise<Message<true> | undefined> {
  const channel = getStandingsChannel();
  const messages = await channel.messages.fetch();

  await db.read();

  return messages.find(message => message.id === db.data?.standingsMessageId);
}

export async function saveStandingsMessageId(message: Message<true>): Promise<void> {
  db.data!.standingsMessageId = message.id;
  await db.write();
}

type Outcome = "W" | "L";

interface TeamStats {
  games: number;
  wins: number;
  losses: number;
  conferenceWins: number;
  conferenceLosses: number;
  winPercent: string;
  last: Outcome[];
}

export type TeamStandings = Team & TeamStats;

interface Standings {
  east: TeamStandings[];
  west: TeamStandings[];
}

export async function generateStandings() {
  const results = await getResults();

  const standings = seasonTeams.map(team => {
    const teamResults = results.filter(result => result.homeTeam.name === team.name || result.awayTeam.name === team.name);
    const teamStats = teamResults.reduce((acc, result) => {
      let winner = result.homeTeam;
      if (result.awayTeamScore > result.homeTeamScore) {
        winner = result.awayTeam;
      }

      const isConferenceGame = result.homeTeam.conference === result.awayTeam.conference;

      if (winner.name === team.name) {
        acc.wins += 1;
        acc.last.push("W");
        if (isConferenceGame) {
          acc.conferenceWins += 1;
        }
      } else {
        acc.losses += 1;
        acc.last.push("L");
        if (isConferenceGame) {
          acc.conferenceLosses += 1;
        }
      }

      acc.games = acc.wins + acc.losses;
      acc.winPercent = formatWinPercent(acc.wins / acc.games);

      return acc;
    },
      {
        wins: 0,
        games: 0,
        losses: 0,
        conferenceWins: 0,
        conferenceLosses: 0,
        winPercent: '.000',
        last: []
      } as TeamStats);

    return {
      ...team,
      ...teamStats
    };
  })
    .reduce((acc, teamStandings) => {
      if (teamStandings.conference === "east") {
        acc.east.push(teamStandings);
      } else {
        acc.west.push(teamStandings);
      }
      return acc;
    }, { east: [], west: [] } as Standings);

  standings.east.sort((a, b) => b.wins - a.wins);
  standings.west.sort((a, b) => b.wins - a.wins);

  return standings;
}

function buildStandingRow(team: TeamStandings, index: number): string {
  return `| ${index + 1} | ${team.name.padEnd(24, " ")}| ${team.games}  | ${team.wins}  | ${team.losses}  | ${team.conferenceWins}-${team.conferenceLosses}  | ${team.winPercent} |  ${team.last.slice(-3).join("").padEnd(3, "-")}    |   |`;
}

export async function buildStandingsMessage(): Promise<string> {
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

