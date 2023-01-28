import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { prismaMatchRepository, prismaMatchResultRepository } from '../repos/impl/Prisma';
import { CreateMatchUseCase } from './CreateMatch';
import { CreateMatchResultUseCase } from './CreateMatchResult';
import { CreateSeasonMatchesUseCase } from './CreateSeasonMatches';

export const createMatchUseCase = new CreateMatchUseCase(prismaMatchRepository);

export const createSeasonMatchesUseCase = new CreateSeasonMatchesUseCase(
  prismaSeasonRepository,
  prismaTeamRepository,
  prismaMatchRepository
);

export const createMatchResultUseCase = new CreateMatchResultUseCase(
  prismaMatchResultRepository,
  prismaSeasonRepository,
  prismaPlayerRepository
);
