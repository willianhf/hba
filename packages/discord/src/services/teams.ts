export type Conference = "east" | "west";

export interface Team {
  name: string;
  emoji: string;
  conference: Conference;
}

export const teams: Team[] = [
  {
    name: "Atlanta Hawks",
    emoji: "atl",
    conference: "east"
  },
  {
    name: "Brooklyn Nets",
    emoji: "bkn",
    conference: "east"
  },
  {
    name: "New York Knicks",
    emoji: "nyk",
    conference: "east"
  },
  {
    name: "Toronto Raptors",
    emoji: "tor",
    conference: "east"
  },
  {
    name: "Denver Nuggets",
    emoji: "den",
    conference: "west"
  },
  {
    name: "Golden State Warriors",
    emoji: "gsw",
    conference: "west"
  },
  {
    name: "Memphis Grizzlies",
    emoji: "mem",
    conference: "west"
  },
  {
    name: "Sacramento Kings",
    emoji: "sac",
    conference: "west"
  }
];

