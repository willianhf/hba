import create from "zustand";
import produce from "immer";
import { Player, SelectedTeam, Team, Stats, HomeOrAway } from "./types";

interface Store {
  home: SelectedTeam | null;
  away: SelectedTeam | null;
  setTeam: (homeOrAway: HomeOrAway, team: Team) => void;
  addPlayer: (homeOrAway: HomeOrAway) => void;
  removePlayer: (homeOrAway: HomeOrAway, player: Player) => void;
  updatePlayerName: (homeOrAway: HomeOrAway, player: Player, name: string) => void;
  setPlayerCaptain: (homeOrAway: HomeOrAway, player: Player) => void;
  increasePlayerStat: (homeOrAway: HomeOrAway, player: Player, stat: keyof Stats) => void;
  decreasePlayerStat: (homeOrAway: HomeOrAway, player: Player, stat: keyof Stats) => void;
}

export const useStore = create<Store>((set) => ({
  home: null,
  away: null,
  setTeam: (homeOrAway, team) => set(() => ({ [homeOrAway]: { ...team, players: [] } })),
  addPlayer: (homeOrAway) =>
    set(
      produce((state: Store) => {
        const length = state[homeOrAway]!.players.length;
        state[homeOrAway]?.players.push({
          id: length + 1,
          isCaptain: length === 0 ? true : false,
          name: "",
          points: 0,
          assists: 0,
          steals: 0,
          rebounds: 0,
          blocks: 0,
          turnovers: 0,
          fouls: 0
        });
      })
    ),
  removePlayer: (homeOrAway, player) =>
    set(
      produce((state: Store) => {
        state[homeOrAway]!.players = state[homeOrAway]!.players.filter((p) => p.id !== player.id);
      })
    ),
  updatePlayerName: (homeOrAway, player, name) =>
    set(
      produce((state: Store) => {
        const index = state[homeOrAway]?.players.findIndex((p) => player.id === p.id) ?? -1;
        if (index >= 0) {
          state[homeOrAway]!.players[index].name = name;
        }
      })
    ),
  setPlayerCaptain: (homeOrAway, player) =>
    set(
      produce((state: Store) => {
        state[homeOrAway]!.players = state[homeOrAway]!.players.map((p) => {
          if (player.id === p.id) {
            return { ...p, isCaptain: true };
          }

          return { ...p, isCaptain: false };
        });
      })
    ),
  increasePlayerStat: (homeOrAway, player, stat) =>
    set(
      produce((state: Store) => {
        const index = state[homeOrAway]?.players.findIndex((p) => player.id === p.id) ?? -1;
        if (index >= 0) {
          state[homeOrAway]!.players[index][stat] += 1;
        }
      })
    ),
  decreasePlayerStat: (homeOrAway, player, stat) =>
    set(
      produce((state: Store) => {
        const index = state[homeOrAway]?.players.findIndex((p) => player.id === p.id) ?? -1;
        if (index >= 0) {
          const statValue = state[homeOrAway]!.players[index][stat];
          if (statValue > 0) {
            state[homeOrAway]!.players[index][stat] -= 1;
          }
        }
      })
    )
}));
