import { prismaSeasonRepository } from '~/modules/season/repos';
import {
  prismaNBATeamRepository, prismaRosterRepository, prismaTeamRepository
} from '~/modules/team/repos/impl/Prisma';
import { AddActorToRosterUseCase } from './AddActorToRoster';
import { ApplyTeamUseCase } from './ApplyTeam';
import { ChangeTeamApprovalStatusUseCase } from './ChangeTeamApprovalStatus';
import { RemoveActorFromRosterUseCase } from './RemoveActorFromRoster';

export const applyTeamUseCase = new ApplyTeamUseCase(
  prismaTeamRepository,
  prismaRosterRepository,
  prismaNBATeamRepository,
  prismaSeasonRepository
);

export const changeTeamApprovalStatusUseCase = new ChangeTeamApprovalStatusUseCase(prismaTeamRepository);

export const addActorToRosterUseCase = new AddActorToRosterUseCase(prismaRosterRepository);
export const removeActorFromRosterUseCase = new RemoveActorFromRosterUseCase(prismaRosterRepository);
