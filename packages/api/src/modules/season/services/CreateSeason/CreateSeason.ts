import { Service } from '~/shared/core/Service';
import { Season } from '../../domain/Season';
import { SeasonRepository } from '../../repos';
import { NameTakenError } from './Errors';

interface CreateSeasonDTO {
  name: string;
  isCurrent: boolean;
}

export class CreateSeasonService implements Service<CreateSeasonDTO, Season> {
  public constructor(private readonly seasonRepository: SeasonRepository) {}

  public async execute(input: CreateSeasonDTO): Promise<Season> {
    const existentSeason = await this.seasonRepository.findByName(input.name);
    if (existentSeason) {
      throw new NameTakenError(input.name);
    }

    const season = new Season(input);
    const persistedSeason = await this.seasonRepository.create(season);

    return persistedSeason;
  }
}
