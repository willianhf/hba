import { TeamRosterRole } from '@prisma/client';
import { ValidationError } from 'yup';
import { SeasonRepository } from '~/modules/season/repos';
import { ValidationInputError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
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

export class ApplyTeamService implements Service<ApplyTeamDTO, ApplyTeamResult> {
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

    const isCaptainInTeam = await this.teamRosterRepository.isPlayerInRoster(
      dto.captainPlayerId,
      currentSeason.getId()
    );
    if (isCaptainInTeam) {
      throw new ValidationError('Você já está em uma equipe.');
    }

    const coCaptainId = new UniqueIdentifier(dto.coCaptainPlayerId);
    const isCoCaptainInTeam = await this.teamRosterRepository.isPlayerInRoster(coCaptainId, currentSeason.getId());
    if (isCoCaptainInTeam) {
      throw new ValidationError('O subcapitão selecionado já está em uma equipe.');
    }

    let team = new Team({ nbaTeamId, seasonId: currentSeason.getId() });
    team = await this.teamRepository.create(team);

    const teamRosterCaptain = new TeamRoster({
      teamId: team.getId(),
      playerId: dto.captainPlayerId,
      role: TeamRosterRole.CAPTAIN
    });

    const teamRosterCoCaptain = new TeamRoster({
      teamId: team.getId(),
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
