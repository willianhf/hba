import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { SeasonGame } from "./services/games.js";
import { Result } from "./services/results.js";
import { ScheduleGame } from "./services/schedule.js";

interface Data {
  results: Result[];
  seasonGames: SeasonGame[];
  seasonGamesGenerated: boolean;
  standingsMessageId?: string | null;
  seasonGamesMessageId?: string | null;
  scheduledGames: ScheduleGame[];
}

const adapter = new JSONFile<Data>("db.json");
export const db = new Low(adapter);

await db.read();

db.data ||= {
  results: [],
  seasonGames: [],
  seasonGamesGenerated: false,
  scheduledGames: []
};

db.data.scheduledGames ||= [];

await db.write();
