import { TeamRosterRole } from '@prisma/client';
import { SeasonRepository } from '~/modules/season/repos';
import { IUseCase, ValidationError, ValidationInputError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { Team, TeamRoster } from '../../domain';
import { TeamRepository, TeamRosterRepository } from '../../repos';
import { isNBATeamAvailableService } from '../NBATeamAvailable';

interface ApplyTeamDTO {
  nbaTeamId: string;
  captainPlayerId: UniqueIdentifier;
  coCaptainPlayerId: string;
}

type ApplyTeamResult = Team;

export class ApplyTeamService implements IUseCase<ApplyTeamDTO, ApplyTeamResult> {
  public constructor(
    private teamRepository: TeamRepository,
    private teamRosterRepository: TeamRosterRepository,
    private seasonRepository: SeasonRepository
  ) {}

  public async execute(dto: ApplyTeamDTO): Promise<ApplyTeamResult> {
    const currentSeason = await this.seasonRepository.findCurrent();
    const nbaTeamId = new UniqueIdentifier(dto.nbaTeamId);

    const isNBATeamAvailable = await isNBATeamAvailableService.execute({ nbaTeamId });
    if (!isNBATeamAvailable) {
      throw new ValidationInputError({ field: 'nbaTeamId', message: 'Essa equipe já foi escolhida.' });
    }

    const isCaptainInTeam = await this.teamRosterRepository.isPlayerInRoster(dto.captainPlayerId, currentSeason.id);
    if (isCaptainInTeam) {
      throw new ValidationError('Você já está em uma equipe.');
    }

    const coCaptainId = new UniqueIdentifier(dto.coCaptainPlayerId);
    const isCoCaptainInTeam = await this.teamRosterRepository.isPlayerInRoster(coCaptainId, currentSeason.id);
    if (isCoCaptainInTeam) {
      throw new ValidationError('O subcapitão selecionado já está em uma equipe.');
    }

    let team = new Team({ nbaTeamId, seasonId: currentSeason.id });
    team = await this.teamRepository.create(team);

    const teamRosterCaptain = new TeamRoster({
      teamId: team.id,
      playerId: dto.captainPlayerId,
      role: TeamRosterRole.CAPTAIN
    });

    const teamRosterCoCaptain = new TeamRoster({
      teamId: team.id,
      playerId: coCaptainId,
      role: TeamRosterRole.CO_CAPTAIN
    });

    await Promise.all([
      this.teamRosterRepository.create(teamRosterCaptain),
      this.teamRosterRepository.create(teamRosterCoCaptain)
    ]);

    return team;
  }
}
