import { markSeasonGamePlayed } from "../services/games.js";
import { saveResult, type Result } from "../services/results.js";
import { upsertStandings } from "./standings.js";

export async function onSendResult(result: Result): Promise<void> {
  await saveResult(result);
  await markSeasonGamePlayed(result);

  upsertStandings();
}
