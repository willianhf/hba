import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { SeasonGame } from "./services/games.js";
import { Result } from "./services/results.js";

interface Data {
  results: Result[];
  seasonGames: SeasonGame[];
  seasonGamesGenerated: boolean;
  standingsMessageId?: string | null;
  seasonGamesMessageId?: string | null;
}

const adapter = new JSONFile<Data>("db.json");
export const db = new Low(adapter);

await db.read();
db.data ||= { results: [], seasonGames: [], seasonGamesGenerated: false };
await db.write();
