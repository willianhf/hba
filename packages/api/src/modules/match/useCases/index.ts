import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { prismaMatchRepository } from '../repos/impl/Prisma';
import { CreateMatchUseCase } from './CreateMatch';
import { CreateSeasonMatchesUseCase } from './CreateSeasonMatches';

export const createMatchUseCase = new CreateMatchUseCase(prismaMatchRepository);

export const createSeasonMatchesUseCase = new CreateSeasonMatchesUseCase(
  prismaSeasonRepository,
  prismaTeamRepository,
  prismaMatchRepository
);
