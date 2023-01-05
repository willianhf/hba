import { PlusIcon } from "@heroicons/react/20/solid";
import { useStore } from "../store";
import { HomeOrAway } from "../types";
import { Player } from "./Player";
import { StatsHeader } from "./StatsHeader";
import { TeamSelector } from "./TeamSelector";

interface Props {
  homeOrAway: HomeOrAway;
}

export function Team(props: Props): JSX.Element {
  const players = useStore((state) => state[props.homeOrAway]?.players ?? []);
  const { addPlayer, setTeam } = useStore((state) => ({ addPlayer: state.addPlayer, setTeam: state.setTeam }));
  const team = useStore((state) => state[props.homeOrAway]);

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <TeamSelector onSelect={(team) => setTeam(props.homeOrAway, team)} />
        </div>
        <div className="flex-1">
          <StatsHeader />
        </div>
      </div>
      {team && (
        <div className="mt-3 space-y-2">
          {players.map((player) => (
            <Player key={player.id} homeOrAway={props.homeOrAway} player={player} />
          ))}
          <button
            type="button"
            className="rounded-md border border-transparent bg-blue-100 p-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            title="Adicionar jogador"
            onClick={() => addPlayer(props.homeOrAway)}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
