import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRepository, prismaTeamRosterRepository } from '~/modules/team/repos/impl/Prisma';
import { ApplyTeamService } from './ApplyTeam';

export const applyTeamService = new ApplyTeamService(
  prismaTeamRepository,
  prismaTeamRosterRepository,
  prismaSeasonRepository
);
