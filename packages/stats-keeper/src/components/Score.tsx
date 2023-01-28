import { sumPoints } from "../utils/stats";
import { useStore } from "../store";

export function Score(): JSX.Element {
  const { home, away } = useStore((state) => ({ home: state.home, away: state.away }));

  const homeScore = sumPoints(home?.players ?? []);
  const awayScore = sumPoints(away?.players ?? []);

  return (
    <span className="text-center text-white text-xl mb-2">
      {away?.emoji.toUpperCase() ?? ""} {awayScore} vs. {homeScore} {home?.emoji.toUpperCase() ?? ""}
    </span>
  );
}
