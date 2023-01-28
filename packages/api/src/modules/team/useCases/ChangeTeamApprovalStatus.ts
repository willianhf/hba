import { IUseCase, ValidationError } from '~/shared/core';
import { ApprovalStatus, Team } from '../domain';
import { TeamRepository } from '../repos';

interface ChangeTeamApprovalStatusDTO {
  status: ApprovalStatus;
  team: Team;
}

type ChangeTeamApprovalStatusResult = void;

export class ChangeTeamApprovalStatusUseCase implements IUseCase<ChangeTeamApprovalStatusDTO, ChangeTeamApprovalStatusResult> {
  public constructor(private readonly teamRepository: TeamRepository) {}

  public async execute(dto: ChangeTeamApprovalStatusDTO): Promise<ChangeTeamApprovalStatusResult> {
    dto.team.changeStatus(dto.status);
    await this.teamRepository.update(dto.team);
  }
}
