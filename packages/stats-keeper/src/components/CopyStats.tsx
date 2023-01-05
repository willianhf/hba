import { ClipboardIcon } from "@heroicons/react/20/solid";
import { useStore } from "../store";
import { Player } from "../types";
import { sumPoints } from "../utils/stats";

const playerStatsRow = (player: Player, spacePad: number) =>
  `${player.isCaptain ? "© " : ""}${player.name.padEnd(spacePad, " ")} | PTS: ${player.points
    .toString()
    .padStart(2, " ")} AST: ${player.assists.toString().padStart(2, " ")} STL: ${player.steals
    .toString()
    .padStart(2, " ")} REB: ${player.rebounds.toString().padStart(2, " ")} BLK: ${player.blocks
    .toString()
    .padStart(2, " ")} TO: ${player.turnovers.toString().padStart(2, " ")} F: ${player.fouls
    .toString()
    .padStart(2, " ")}`;

const PAD_OFFSET = 1;

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
