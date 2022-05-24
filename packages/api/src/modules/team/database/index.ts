import { NBATeam, Prisma, Team, TeamRoster } from '@prisma/client';

export type PersistedNBATeam = NBATeam;

export type PersistedTeam = Team;
export type ToPersistTeam = Prisma.TeamUncheckedCreateInput;

export type PersistedTeamRoster = TeamRoster;
export type ToPersistTeamRoster = Prisma.TeamRosterUncheckedCreateInput;