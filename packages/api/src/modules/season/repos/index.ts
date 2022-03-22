import { PrismaSeasonRepository } from './impl/Prisma';

export { SeasonRepository } from './Season';

export const prismaSeasonRepository = new PrismaSeasonRepository();
