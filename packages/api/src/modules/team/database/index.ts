import { Actor, NBATeam, Prisma, Season, Team, TeamActor } from '@prisma/client';

export type PersistedNBATeam = NBATeam;

export type PersistedTeamActor = TeamActor & {
  actor: Actor;
};
export type ToPersistTeamActor = Prisma.TeamActorUncheckedCreateInput;

export type PersistedTeam = Team & {
  nbaTeam: NBATeam;
  roster: PersistedTeamActor[];
  season: Season;
};
export type ToPersistTeam = Prisma.TeamCreateInput;
