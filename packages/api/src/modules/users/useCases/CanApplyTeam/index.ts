import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRosterRepository } from '~/modules/team/repos/impl/Prisma';
import { CanApplyTeamUseCase } from './UseCase';

export const canApplyTeamUseCase = new CanApplyTeamUseCase(
  prismaTeamRosterRepository,
  prismaSeasonRepository,
  prismaPlayerRepository
);

export * as CanApplyTeamErrors from './Errors';
