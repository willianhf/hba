import { resetSeasonGames, upsertSeasonGames } from "../services/games.js";
import { resetResults } from "../services/results.js";
import {
  buildStandingsMessage,
  getStandingsChannel,
  getStandingsMessage,
  saveStandingsMessageId
} from "../services/standings.js";

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
  await resetSeasonGames();

  upsertStandings();
}
