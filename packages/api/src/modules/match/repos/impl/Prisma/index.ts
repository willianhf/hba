import { PrismaMatchRepository } from './Match';
import { PrismaMatchSeriesRepository } from './MatchSeries';

export const prismaMatchRepository = new PrismaMatchRepository();
export const prismaMatchSeriesRepository = new PrismaMatchSeriesRepository();
