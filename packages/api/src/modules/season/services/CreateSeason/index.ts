import { prismaSeasonRepository } from '../../repos';
import { CreateSeasonService } from './CreateSeason';

export const createSeasonService = new CreateSeasonService(prismaSeasonRepository);
