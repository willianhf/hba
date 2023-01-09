import { IUseCase, ValidationError } from '~/shared/core';
import { SeasonRepository } from '../../repos';

interface MakeSeasonCurrentDTO {
  name: string;
}

export class MakeSeasonCurrentService implements IUseCase<MakeSeasonCurrentDTO, void> {
  public constructor(private readonly seasonRepository: SeasonRepository) {}

  public async execute(dto: MakeSeasonCurrentDTO): Promise<void> {
    const season = await this.seasonRepository.findByName(dto.name);
    if (!season) {
      throw new ValidationError(`A temporada ${dto.name} não existe.`);
    }

    await this.seasonRepository.makeSeasonCurrent(season);
  }
}
