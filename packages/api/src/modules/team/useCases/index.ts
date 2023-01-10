import { prismaSeasonRepository } from '~/modules/season/repos';
import {
  prismaTeamRepository,
  prismaRosterRepository,
  prismaNBATeamRepository
} from '~/modules/team/repos/impl/Prisma';
import { ApplyTeamUseCase } from './ApplyTeam';
import { ChangeTeamApprovalStatusUseCase } from './ChangeTeamApprovalStatus';

export const applyTeamUseCase = new ApplyTeamUseCase(
  prismaTeamRepository,
  prismaRosterRepository,
  prismaNBATeamRepository,
  prismaSeasonRepository
);

export const changeTeamApprovalStatusUseCase = new ChangeTeamApprovalStatusUseCase(prismaTeamRepository);
