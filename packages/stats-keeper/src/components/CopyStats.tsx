import { ClipboardIcon } from "@heroicons/react/20/solid";
import { useStore } from "../store";
import { Player } from "../types";
import { sumPoints } from "../utils/stats";

const CAPTAIN_TAG = "© ";
const STATS_OFFSET = 2;

const playerStatsRow = (player: Player, spacePad: number) =>
  `${player.isCaptain ? "© " : ""}${player.name.padEnd(player.isCaptain ? spacePad - CAPTAIN_TAG.length : spacePad, " ")} | PTS: ${player.points
    .toString()
    .padStart(STATS_OFFSET, " ")} AST: ${player.assists.toString().padStart(STATS_OFFSET, " ")} STL: ${player.steals
    .toString()
    .padStart(STATS_OFFSET, " ")} REB: ${player.rebounds.toString().padStart(STATS_OFFSET, " ")} BLK: ${player.blocks
    .toString()
    .padStart(STATS_OFFSET, " ")} TO: ${player.turnovers.toString().padStart(STATS_OFFSET, " ")} F: ${player.fouls
    .toString()
    .padStart(STATS_OFFSET, " ")}`;

const PAD_OFFSET = 3;

export function CopyStats(): JSX.Element | null {
  const { home, away } = useStore((state) => ({ home: state.home, away: state.away }));

  function copyStatsToClipboard(): void {
    const homePoints = sumPoints(home?.players ?? []);
    const awayPoints = sumPoints(away?.players ?? []);

    const spacePad = Math.max(...[...home!.players, ...away!.players].map((player) => player.name.length)) + PAD_OFFSET;

    const message = `
:${away?.emoji}: ${away?.name} ${awayPoints} @ ${homePoints} ${home?.name} :${home?.emoji}:
SK: <inserir>
\`\`\`
-x BOXSCORE x-

${home?.emoji.toUpperCase()} | ${home?.name}
${home?.players.map((player) => playerStatsRow(player, spacePad)).join("\n")}

${away?.emoji.toUpperCase()} | ${away?.name}
${away?.players.map((player) => playerStatsRow(player, spacePad)).join("\n")}\`\`\`
`;

    navigator.clipboard.writeText(message);
  }

  if (!home || !away) {
    return null;
  }

  return (
    <button
      type="button"
      className="rounded-md border border-transparent bg-blue-100 p-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      title="Copiar estatísticas"
      onClick={copyStatsToClipboard}
    >
      <ClipboardIcon className="h-4 w-4" />
    </button>
  );
}
