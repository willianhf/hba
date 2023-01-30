import { TeamRole } from '@prisma/client';
import { Actor } from '~/modules/auth/domain';
import { SeasonRepository } from '~/modules/season/repos';
import { IUseCase, ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { ApprovalStatus, Team, TeamActor } from '../domain';
import { NBATeamRepository, RosterRepository, TeamRepository } from '../repos';

interface ApplyTeamDTO {
  nbaTeamId: UniqueIdentifier;
  captainActor: Actor;
  coCaptainActor: Actor;
}

type ApplyTeamResult = Team;

export class ApplyTeamUseCase implements IUseCase<ApplyTeamDTO, ApplyTeamResult> {
  public constructor(
    private readonly teamRepository: TeamRepository,
    private readonly rosterRepository: RosterRepository,
    private readonly nbaTeamRepository: NBATeamRepository,
    private readonly seasonRepository: SeasonRepository
  ) {}

  public async execute(dto: ApplyTeamDTO): Promise<ApplyTeamResult> {
    const currentSeason = await this.seasonRepository.findCurrent();

    if (dto.captainActor.equals(dto.coCaptainActor)) {
      throw new ValidationError('O sub-capitão não pode ser o mesmo que o capitão');
    }

    const isNBATeamAvailable = await this.teamRepository.isAvailable(dto.nbaTeamId);
    if (!isNBATeamAvailable) {
      throw new ValidationError('Essa equipe já foi escolhida');
    }

    const isCaptainInRoster = await this.rosterRepository.isActorInRoster(dto.captainActor.id, currentSeason.id);
    if (isCaptainInRoster) {
      throw new ValidationError('O capitão já está em uma equipe');
    }

    const isCoCaptainInRoster = await this.rosterRepository.isActorInRoster(dto.coCaptainActor.id, currentSeason.id);
    if (isCoCaptainInRoster) {
      throw new ValidationError('O sub-capitão selecionado já está em uma equipe');
    }

    const nbaTeam = await this.nbaTeamRepository.findById(dto.nbaTeamId);

    const team = new Team({
      nbaTeam,
      season: currentSeason,
      status: ApprovalStatus.ACCEPTED
    });

    const teamActorCaptain = new TeamActor({
      teamId: team.id,
      actor: dto.captainActor,
      role: TeamRole.CAPTAIN
    });

    const teamActorCoCaptain = new TeamActor({
      teamId: team.id,
      actor: dto.coCaptainActor,
      role: TeamRole.CO_CAPTAIN
    });

    team.addToRoster(teamActorCaptain);
    team.addToRoster(teamActorCoCaptain);

    await this.teamRepository.create(team);

    return team;
  }
}
