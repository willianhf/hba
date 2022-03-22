import { Prisma, Season } from '@prisma/client';

export type PersistedSeason = Season;
export type ToPersistSeason = Prisma.SeasonCreateInput;