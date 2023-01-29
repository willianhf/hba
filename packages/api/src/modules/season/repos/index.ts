import { PrismaSeasonRepository } from './impl/Prisma';

export { type SeasonRepository } from './Season';

export const prismaSeasonRepository = new PrismaSeasonRepository();
