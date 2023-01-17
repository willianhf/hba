import { MatchSeries, Prisma } from '@prisma/client';
import { playerWithRelations } from '~/modules/player/database';
import { teamWithRelations } from '~/modules/team/database';

export const matchWithRelations = Prisma.validator<Prisma.MatchArgs>()({
  include: {
    homeTeam: teamWithRelations,
    awayTeam: teamWithRelations,
    series: true
  }
});
export type PersistedMatch = Prisma.MatchGetPayload<typeof matchWithRelations>;
export type ToPersistMatch = Prisma.MatchUncheckedCreateInput;

export type PersistedMatchSeries = MatchSeries;

export const matchResultWithRelations = Prisma.validator<Prisma.MatchResultArgs>()({
  include: {
    match: matchWithRelations,
    playerOfTheMatch: playerWithRelations,
    referee: true,
    scorer: true,
    recorder: true,
    videoReferee: true,
    statsKeeper: true
  }
});
export type PersistedMatchResult = Prisma.MatchResultGetPayload<typeof matchResultWithRelations>;
export type ToPersistMatchResult = Prisma.MatchResultUncheckedCreateInput;
