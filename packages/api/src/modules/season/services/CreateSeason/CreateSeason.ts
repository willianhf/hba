import { IUseCase, ValidationError } from '~/shared/core';
import { Season } from '../../domain/Season';
import { SeasonRepository } from '../../repos';

interface CreateSeasonDTO {
  name: string;
  isCurrent: boolean;
}

export class CreateSeasonService implements IUseCase<CreateSeasonDTO, Season> {
  public constructor(private readonly seasonRepository: SeasonRepository) {}

  public async execute(input: CreateSeasonDTO): Promise<Season> {
    const existentSeason = await this.seasonRepository.findByName(input.name);
    if (existentSeason) {
      throw new ValidationError(`A temporada ${input.name} já existe.`);
    }

    const season = new Season(input);
    const persistedSeason = await this.seasonRepository.create(season);

    return persistedSeason;
  }
}
