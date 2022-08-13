import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRepository, prismaTeamRosterRepository } from '~/modules/team/repos/impl/Prisma';
import { ApplyTeamUseCase } from './ApplyTeam';

export const applyTeamService = new ApplyTeamUseCase(
  prismaTeamRepository,
  prismaTeamRosterRepository,
  prismaSeasonRepository
);
