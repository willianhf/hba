import { SeasonRepository } from '~/modules/season/repos';
import { TeamId } from '~/modules/team/domain';
import { TeamRepository } from '~/modules/team/repos';
import { IUseCase, ValidationInputError } from '~/shared/core';
import { Match, MatchKind, MatchSeriesId } from '../domain';
import { MatchRepository } from '../repos';

interface CreateMatchDTO {
  matchKind: MatchKind;
  homeTeamId: TeamId;
  awayTeamId: TeamId;
  scheduledTo?: Date;
  matchSeriesId?: MatchSeriesId;
}

type CreateMatchResult = Match;

export class CreateMatchUseCase implements IUseCase<CreateMatchDTO, CreateMatchResult> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  public async execute(dto: CreateMatchDTO): Promise<CreateMatchResult> {
    const [homeTeam, awayTeam] = await Promise.all([
      this.teamRepository.findById(dto.homeTeamId),
      this.teamRepository.findById(dto.awayTeamId)
    ]);
    if (!homeTeam) {
      throw new ValidationInputError({ field: 'homeTeamId', message: 'Home team not found' });
    }

    if (!awayTeam) {
      throw new ValidationInputError({ field: 'awayTeamId', message: 'Away team not found' });
    }

    const currentSeason = await this.seasonRepository.findCurrent();

    const match = new Match({
      seasonId: currentSeason.id,
      ...dto
    });

    await this.matchRepository.create(match);

    return match;
  }
}
