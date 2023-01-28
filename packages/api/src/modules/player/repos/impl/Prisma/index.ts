import { PrismaIconRepository } from './Icon';
import { PrismaNBAPlayerRepository } from './NBAPlayers';
import { PrismaPlayerRepository } from './Player';
import { PrismaPlayerIconRepository } from './PlayerIcon';
import { PrismaPositionRepository } from './Position';

export const prismaPositionRepository = new PrismaPositionRepository();
export const prismaIconRepository = new PrismaIconRepository();
export const prismaPlayerIconRepository = new PrismaPlayerIconRepository();
export const prismaPlayerRepository = new PrismaPlayerRepository(prismaPlayerIconRepository);
export const prismaNBAPlayerRepository = new PrismaNBAPlayerRepository();
