import { PrismaIconRepository } from './Icon';
import { PrismaNBAPlayerRepository } from './NBAPlayers';
import { PrismaPlayerRepository } from './Player';
import { PrismaPositionRepository } from './Position';

export const prismaPositionRepository = new PrismaPositionRepository();
export const prismaIconRepository = new PrismaIconRepository();
export const prismaPlayerRepository = new PrismaPlayerRepository();
export const prismaNBAPlayerRepository = new PrismaNBAPlayerRepository();