import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useStore } from "../store";
import { HomeOrAway, Player as IPlayer, Stats } from "../types";

interface Props {
  homeOrAway: HomeOrAway;
  player: IPlayer;
}

export function Player(props: Props): JSX.Element {
  const { updatePlayerName, removePlayer, setPlayerCaptain } = useStore((state) => ({
    updatePlayerName: state.updatePlayerName,
    removePlayer: state.removePlayer,
    setPlayerCaptain: state.setPlayerCaptain
  }));

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-1 items-center space-x-2">
        <button type="button" onClick={() => removePlayer(props.homeOrAway, props.player)}>
          <XMarkIcon className="h-4 w-4 text-white" />
        </button>
        <button
          type="button"
          className={clsx(props.player.isCaptain ? "text-green-400" : "text-white")}
          onClick={() => setPlayerCaptain(props.homeOrAway, props.player)}
        >
          ©
        </button>
        <div className="bg-zinc-700 rounded-md shadow-sm border border-zinc-600 overflow-hidden focus-within:ring-1 ring-zinc-700">
          <input
            type="text"
            className="px-2 py-1 bg-zinc-700 w-full border-none focus:outline-none focus:ring-0 rounded-md text-white text-sm"
            onChange={(event) => updatePlayerName(props.homeOrAway, props.player, event.target.value)}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex font-mono text-white">
          <PlayerStat {...props} stat="points" />
          <PlayerStat {...props} stat="assists" />
          <PlayerStat {...props} stat="rebounds" />
          <PlayerStat {...props} stat="steals" />
          <PlayerStat {...props} stat="blocks" />
          <PlayerStat {...props} stat="turnovers" />
          <PlayerStat {...props} stat="fouls" />
        </div>
      </div>
    </div>
  );
}

interface PlayerStatProps {
  homeOrAway: HomeOrAway;
  player: IPlayer;
  stat: keyof Stats;
}

function PlayerStat(props: PlayerStatProps): JSX.Element {
  const { increase, decrease } = useStore((state) => ({
    increase: state.increasePlayerStat,
    decrease: state.decreasePlayerStat
  }));

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, fn: Function) {
    event.preventDefault();
    fn();
  }

  return (
    <button
      type="button"
      className="text-center p-0 select-none flex-grow w-20"
      onClick={(event) => onClick(event, () => increase(props.homeOrAway, props.player, props.stat))}
      onContextMenu={(event) => onClick(event, () => decrease(props.homeOrAway, props.player, props.stat))}
    >
      {props.player[props.stat]}
    </button>
  );
}
