export type Conference = "east" | "west";

export type HomeOrAway = "home" | "away";

export interface Team {
  name: string;
  emoji: string;
  conference: Conference;
}

export interface Stats {
  points: number;
  assists: number;
  steals: number;
  rebounds: number;
  blocks: number;
  turnovers: number;
  fouls: number;
}

export interface Player extends Stats {
  id: number;
  name: string;
  isCaptain: boolean;
}

export interface SelectedTeam extends Team {
  players: Player[];
}
