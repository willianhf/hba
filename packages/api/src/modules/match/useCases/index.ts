import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { prismaMatchRepository } from '../repos/impl/Prisma';
import { CreateMatchUseCase } from './CreateMatch';

export const createMatchUseCase = new CreateMatchUseCase(
  prismaMatchRepository,
  prismaSeasonRepository,
  prismaTeamRepository
);
