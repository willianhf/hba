import { TeamRosterRole } from '@prisma/client';
import { SeasonRepository } from '~/modules/season/repos';
import { ActorId } from '~/modules/auth/domain';
import { IUseCase, ValidationError, ValidationInputError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { Team, TeamRoster } from '../../domain';
import { TeamRepository, TeamRosterRepository } from '../../repos';
import { isNBATeamAvailableService } from '../NBATeamAvailable';

interface ApplyTeamDTO {
  nbaTeamId: UniqueIdentifier;
  captainActorId: ActorId;
  coCaptainActorId: ActorId;
}

type ApplyTeamResult = Team;

export class ApplyTeamUseCase implements IUseCase<ApplyTeamDTO, ApplyTeamResult> {
  public constructor(
    private readonly teamRepository: TeamRepository,
    private readonly teamRosterRepository: TeamRosterRepository,
    private readonly seasonRepository: SeasonRepository
  ) {}

  public async execute(dto: ApplyTeamDTO): Promise<ApplyTeamResult> {
    const currentSeason = await this.seasonRepository.findCurrent();

    const hasPendingApplication = await this.teamRosterRepository.hasPendingApplication(
      dto.captainActorId,
      currentSeason.id
    );
    if (hasPendingApplication) {
      throw new ValidationError('Você já possui uma inscrição de equipe pendente');
    }

    if (dto.captainActorId === dto.coCaptainActorId) {
      throw new ValidationInputError({ field: 'coCaptainActor', message: 'O sub-capitão não pode ser você mesmo' });
    }

    const isNBATeamAvailable = await isNBATeamAvailableService.execute({ nbaTeamId: dto.nbaTeamId });
    if (!isNBATeamAvailable) {
      throw new ValidationInputError({ field: 'nbaTeam', message: 'Essa equipe já foi escolhida' });
    }

    const isCaptainInRoster = await this.teamRosterRepository.isActorInRoster(dto.captainActorId, currentSeason.id);
    if (isCaptainInRoster) {
      throw new ValidationError('Você já está em uma equipe');
    }

    const isCoCaptainInRoster = await this.teamRosterRepository.isActorInRoster(dto.coCaptainActorId, currentSeason.id);
    if (isCoCaptainInRoster) {
      throw new ValidationInputError({
        field: 'coCaptainActor',
        message: 'O sub-capitão selecionado já está em uma equipe'
      });
    }

    const team = new Team({ nbaTeamId: dto.nbaTeamId, seasonId: currentSeason.id });
    await this.teamRepository.create(team);

    const teamRosterCaptain = new TeamRoster({
      teamId: team.id,
      actorId: dto.captainActorId,
      role: TeamRosterRole.CAPTAIN
    });

    const teamRosterCoCaptain = new TeamRoster({
      teamId: team.id,
      actorId: dto.coCaptainActorId,
      role: TeamRosterRole.CO_CAPTAIN
    });

    await Promise.all([
      this.teamRosterRepository.create(teamRosterCaptain),
      this.teamRosterRepository.create(teamRosterCoCaptain)
    ]);

    return team;
  }
}
