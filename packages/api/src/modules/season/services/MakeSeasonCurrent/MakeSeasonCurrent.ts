import { EntityNotFoundError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
import { IncIdentifier } from '~/shared/domain/IncIdentifier';
import { SeasonRepository } from '../../repos';

interface MakeSeasonCurrentDTO {
  seasonId: number;
}

export class MakeSeasonCurrentService implements Service<MakeSeasonCurrentDTO, void> {
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
