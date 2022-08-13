import { ApprovalStatus } from '@prisma/client';
import { PlayerRepository } from '~/modules/player/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { TeamRosterRepository } from '~/modules/team/repos';
import { IUseCase } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import * as Errors from './Errors';

interface CanApplyTeamDTO {
  userId: UniqueIdentifier;
}

type CanApplyTeamResult = boolean;

export class CanApplyTeamUseCase implements IUseCase<CanApplyTeamDTO, CanApplyTeamResult> {
  public constructor(
    private readonly teamRosterRepository: TeamRosterRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly playerRepository: PlayerRepository
  ) {}

  public async execute(dto: CanApplyTeamDTO): Promise<CanApplyTeamResult> {
    const currentSeason = await this.seasonRepository.findCurrent();
    const players = await this.playerRepository.findByUserAndSeason(dto.userId, currentSeason.id);
    const activePlayer = players.find(player => player.status === ApprovalStatus.ACCEPTED);
    if (!activePlayer) {
      throw new Errors.MissingAcceptedPlayerError();
    }

    const isInRoster = await this.teamRosterRepository.isPlayerInRoster(activePlayer.id, currentSeason.id);
    if (isInRoster) {
      throw new Errors.AlreadyInTeamRosterError();
    }

    return true;
  }
}
