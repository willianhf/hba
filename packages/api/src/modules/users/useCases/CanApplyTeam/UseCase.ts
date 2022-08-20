import { SeasonRepository } from '~/modules/season/repos';
import { TeamRosterRepository } from '~/modules/team/repos';
import { IUseCase } from '~/shared/core';
import { UserId } from '../../domain';

interface CanApplyTeamDTO {
  userId: UserId;
}

type CanApplyTeamResult = boolean;

export class CanApplyTeamUseCase implements IUseCase<CanApplyTeamDTO, CanApplyTeamResult> {
  public constructor(
    private readonly teamRosterRepository: TeamRosterRepository,
    private readonly seasonRepository: SeasonRepository
  ) {}

  public async execute(dto: CanApplyTeamDTO): Promise<CanApplyTeamResult> {
    const currentSeason = await this.seasonRepository.findCurrent();

    const hasPendingApplication = await this.teamRosterRepository.hasPendingApplication(dto.userId, currentSeason.id);
    if (hasPendingApplication) {
      return false;
    }

    const isInRoster = await this.teamRosterRepository.isUserInRoster(dto.userId, currentSeason.id);
    if (isInRoster) {
      return false;
    }

    return true;
  }
}
