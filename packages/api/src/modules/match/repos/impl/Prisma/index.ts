import { PrismaMatchRepository } from './Match';
import { PrismaMatchResultRepository } from './MatchResult';
import { PrismaMatchSeriesRepository } from './MatchSeries';

export const prismaMatchRepository = new PrismaMatchRepository();
export const prismaMatchSeriesRepository = new PrismaMatchSeriesRepository();
export const prismaMatchResultRepository = new PrismaMatchResultRepository();
