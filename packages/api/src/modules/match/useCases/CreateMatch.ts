import { Season } from '~/modules/season/domain';
import { Team } from '~/modules/team/domain';
import { IUseCase, ValidationError } from '~/shared/core';
import { Match, MatchKind, MatchSeries } from '../domain';
import { MatchRepository } from '../repos';

interface CreateMatchDTO {
  season: Season;
  matchKind: MatchKind;
  homeTeam: Team;
  awayTeam: Team;
  scheduledTo?: Date;
  matchSeries?: MatchSeries;
}

type CreateMatchResult = Match;

export class CreateMatchUseCase implements IUseCase<CreateMatchDTO, CreateMatchResult> {
  constructor(private readonly matchRepository: MatchRepository) {}

  public async execute(dto: CreateMatchDTO): Promise<CreateMatchResult> {
    if (dto.matchKind === MatchKind.REGULAR) {
      const hasMatch = await this.matchRepository.exists(dto.season.id, dto.homeTeam, dto.awayTeam, MatchKind.REGULAR);
      if (hasMatch) {
        throw new ValidationError('Essa partida já existe na temporada regular');
      }
    }

    const match = new Match({
      seasonId: dto.season.id,
      ...dto
    });

    await this.matchRepository.create(match);

    return match;
  }
}
