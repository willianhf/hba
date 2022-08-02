import { IUseCase } from '~/shared/core';
import { EntityNotFoundError } from '~/shared/core/Error';
import { IncIdentifier } from '~/shared/domain/IncIdentifier';
import { SeasonRepository } from '../../repos';

interface MakeSeasonCurrentDTO {
  seasonId: number;
}

export class MakeSeasonCurrentService implements IUseCase<MakeSeasonCurrentDTO, void> {
  public constructor(private readonly seasonRepository: SeasonRepository) {}

  public async execute(input: MakeSeasonCurrentDTO): Promise<void> {
    const seasonId = new IncIdentifier(input.seasonId);
    const season = await this.seasonRepository.findById(seasonId);
    if (!season) {
      throw new EntityNotFoundError();
    }

    await this.seasonRepository.makeSeasonCurrent(season);
  }
}
