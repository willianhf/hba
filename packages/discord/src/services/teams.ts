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
    name: "Boston Celtics",
    emoji: "bos",
    conference: "east"
  },
  {
    name: "Brooklyn Nets",
    emoji: "bkn",
    conference: "east"
  },
  {
    name: "Charlotte Hornets",
    emoji: "cha",
    conference: "east"
  },
  {
    name: "Chicago Bulls",
    emoji: "chi",
    conference: "east"
  },
  {
    name: "Cleveland Cavaliers",
    emoji: "cle",
    conference: "east"
  },
  {
    name: "Detroit Pistons",
    emoji: "det",
    conference: "east"
  },
  {
    name: "Indiana Pacers",
    emoji: "ind",
    conference: "east"
  },
  {
    name: "Miami Heat",
    emoji: "mia",
    conference: "east"
  },
  {
    name: "Milwaukee Bucks",
    emoji: "mil",
    conference: "east"
  },
  {
    name: "New York Knicks",
    emoji: "nyk",
    conference: "east"
  },
  {
    name: "Orlando Magic",
    emoji: "orl",
    conference: "east"
  },
  {
    name: "Philadelphia 76ers",
    emoji: "phi",
    conference: "east"
  },
  {
    name: "Toronto Raptors",
    emoji: "tor",
    conference: "east"
  },
  {
    name: "Washington Wizards",
    emoji: "tor",
    conference: "east"
  },
  {
    name: "Dallas Mavericks",
    emoji: "dal",
    conference: "west"
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
    name: "Houston Rockets",
    emoji: "hou",
    conference: "west"
  },
  {
    name: "Los Angeles Clippers",
    emoji: "lac",
    conference: "west"
  },
  {
    name: "Los Angeles Lakers",
    emoji: "lal",
    conference: "west"
  },
  {
    name: "Memphis Grizzlies",
    emoji: "mem",
    conference: "west"
  },
  {
    name: "Minnesota Timberwolves",
    emoji: "min",
    conference: "west"
  },
  {
    name: "New Orleans Pelicans",
    emoji: "nop",
    conference: "west"
  },
  {
    name: "Oklahoma City Thunder",
    emoji: "okc",
    conference: "west"
  },
  {
    name: "Phoenix Suns",
    emoji: "phx",
    conference: "west"
  },
  {
    name: "Portland Trail Blazers",
    emoji: "ptb",
    conference: "west"
  },
  {
    name: "Sacramento Kings",
    emoji: "sac",
    conference: "west"
  },
  {
    name: "San Antonion Spurs",
    emoji: "sas",
    conference: "west"
  },
  {
    name: "Utah Jazz",
    emoji: "uta",
    conference: "west"
  }
];

export const seasonTeams = teams
  .filter(team => ["atl", "bkn", "nyk", "tor", "den", "gsw", "mem", "sac"].includes(team.emoji));
