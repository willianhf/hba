import { SeasonRepository } from '~/modules/season/repos';
import { Team } from '~/modules/team/domain';
import { IUseCase } from '~/shared/core';
import { Match, MatchKind, MatchSeries } from '../domain';
import { MatchRepository } from '../repos';

interface CreateMatchDTO {
  matchKind: MatchKind;
  homeTeam: Team;
  awayTeam: Team;
  scheduledTo?: Date;
  matchSeries?: MatchSeries;
}

type CreateMatchResult = Match;

export class CreateMatchUseCase implements IUseCase<CreateMatchDTO, CreateMatchResult> {
  constructor(private readonly matchRepository: MatchRepository, private readonly seasonRepository: SeasonRepository) {}

  public async execute(dto: CreateMatchDTO): Promise<CreateMatchResult> {
    const currentSeason = await this.seasonRepository.findCurrent();

    const match = new Match({
      seasonId: currentSeason.id,
      ...dto
    });

    await this.matchRepository.create(match);

    return match;
  }
}
