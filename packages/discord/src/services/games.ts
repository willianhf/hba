import { db } from "../db.js";
import { type Result } from "./results.js";
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

  const games = db.data?.seasonGames ?? [];

  return {
    east: games.filter(seasonGame => isSameConference(seasonGame, "east")),
    west: games.filter(seasonGame => isSameConference(seasonGame, "west")),
    between: games.filter(seasonGame => seasonGame.home.conference !== seasonGame.away.conference),
  };
}

export async function markSeasonGamePlayed(result: Result): Promise<void> {
  db.data!.seasonGames = db.data!.seasonGames.map(seasonGame => {
    if (result.homeTeam.name === seasonGame.home.name && result.awayTeam.name === seasonGame.away.name) {
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
    opponents.forEach(opponent => acc.push({ home: team, away: opponent, played: false }));

    return acc;
  }, [] as SeasonGame[]);

  db.data!.seasonGamesGenerated = true;
  db.data!.seasonGames = games;
  await db.write();
}
