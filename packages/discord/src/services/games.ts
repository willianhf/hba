import { hideLinkEmbed, Message, spoiler } from "discord.js";
import { db } from "../db.js";
import { getTeamEmoji } from "../utils/format.js";
import { type Result } from "./results.js";
import { getStandingsChannel } from "./standings.js";
import { teams, type Conference, type Team } from "./teams.js";

export interface SeasonGame {
  home: Team;
  away: Team;
  played: boolean;
}

interface SeasonGames {
  east: SeasonGame[];
  west: SeasonGame[];
  between: SeasonGame[];
}

function isSameConference(seasonGame: SeasonGame, conference: Conference): boolean {
  return seasonGame.home.conference === conference && seasonGame.away.conference === conference;
}

export async function getSeasonGames(): Promise<SeasonGames> {
  await db.read();

  const games = db.data?.seasonGames?.filter(seasonGame => !seasonGame.played) ?? [];

  return {
    east: games.filter(seasonGame => isSameConference(seasonGame, "east")),
    west: games.filter(seasonGame => isSameConference(seasonGame, "west")),
    between: games.filter(seasonGame => seasonGame.home.conference !== seasonGame.away.conference),
  };
}

function hasMatchup(seasonGame: SeasonGame, a: Team, b: Team) {
  return (seasonGame.home.name === a.name && seasonGame.away.name === b.name) || (seasonGame.home.name === b.name && seasonGame.away.name === a.name);
}

export async function markSeasonGamePlayed(result: Result): Promise<void> {
  db.data!.seasonGames = db.data!.seasonGames.map(seasonGame => {
    if (hasMatchup(seasonGame, result.homeTeam, result.awayTeam)) {
      return { ...seasonGame, played: true };
    }

    return seasonGame;
  });

  await db.write();
}

export async function generateSeasonGames(): Promise<void> {
  await db.read();
  if (db.data?.seasonGamesGenerated) {
    return;
  }

  const games = teams.reduce((acc, team) => {
    const opponents = teams.filter(t => t.name !== team.name);
    opponents.forEach(opponent => {
      const isScheduled = acc.find(seasonGame => hasMatchup(seasonGame, team, opponent));
      if (!isScheduled) {
        acc.push({ home: team, away: opponent, played: false });
      }
    });

    return acc;
  }, [] as SeasonGame[]);

  db.data!.seasonGamesGenerated = true;
  db.data!.seasonGames = games;
  await db.write();
}


export async function getSeasonGamesMessage(): Promise<Message<true> | undefined> {
  const channel = getStandingsChannel();
  const messages = await channel.messages.fetch();

  await db.read();

  return messages.find(message => message.id === db.data?.standingsMessageId);
}

export async function saveSeasonGamesMessageId(message: Message<true>): Promise<void> {
  db.data!.seasonGamesMessageId = message.id;
  await db.write();
}

const buildMatchupRow = seasonGame => `${getTeamEmoji(seasonGame.away)} vs. ${getTeamEmoji(seasonGame.home)}`

export async function buildSeasonGamesMessage(): Promise<string> {
  const seasonGames = await getSeasonGames();
  const east = seasonGames.east.map(buildMatchupRow).join("\n");
  const west = seasonGames.west.map(buildMatchupRow).join("\n");
  const between = seasonGames.between.map(buildMatchupRow).join("\n");

  return `
\`\`\`JOGOS RESTANTES\`\`\`
\`EASTERN CONFERENCE\`
${east}

\`WESTERN CONFERENCE\`
${west}

\`BETWEEN CONFERENCES\`
${between}

Sorteio: ${spoiler(hideLinkEmbed("https://www.youtube.com/watch?v=BNgMeoNjcPQ"))}
`
}

export async function upsertSeasonGames(): Promise<void> {
  const standingsChannel = getStandingsChannel();
  const message = await getSeasonGamesMessage();
  const seasonGamesMessage = await buildSeasonGamesMessage();

  if (message) {
    message.edit(seasonGamesMessage);
  } else {
    const sentMessage = await standingsChannel.send(seasonGamesMessage);
    await saveSeasonGamesMessageId(sentMessage);
  }

  console.log("✅ Season games update successfully");
}

