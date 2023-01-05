import { Player } from "../types";

export const sumPoints = (players: Player[]) => players.reduce((acc, player) => acc + player.points, 0);
