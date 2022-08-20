import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRosterRepository } from '~/modules/team/repos/impl/Prisma';
import { CanApplyTeamUseCase } from './UseCase';

export const canApplyTeamUseCase = new CanApplyTeamUseCase(
  prismaTeamRosterRepository,
  prismaSeasonRepository,
);
