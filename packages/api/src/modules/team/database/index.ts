import { NBATeam, Prisma } from '@prisma/client';

export const teamActorWithRelations = Prisma.validator<Prisma.TeamActorArgs>()({
  include: {
    actor: true
  }
});
export type PersistedTeamActor = Prisma.TeamActorGetPayload<typeof teamActorWithRelations>;
export type ToPersistTeamActor = Prisma.TeamActorUncheckedCreateInput;

export const teamWithRelations = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    nbaTeam: true,
    roster: teamActorWithRelations,
    season: true
  }
});
export type PersistedTeam = Prisma.TeamGetPayload<typeof teamWithRelations>;
export type ToPersistTeam = Prisma.TeamCreateInput;

export type PersistedNBATeam = NBATeam;
