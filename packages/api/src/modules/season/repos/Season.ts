import { IncIdentifier } from '~/shared/domain/IncIdentifier';
import { Season } from '../domain/Season';

export interface SeasonRepository {
  findAll(): Promise<Season[]>;
  findCurrent(): Promise<Season | null>;
  findById(id: IncIdentifier): Promise<Season | null>;
  findByName(name: string): Promise<Season | null>;
  create(season: Season): Promise<Season>;
  makeSeasonCurrent(season: Season): Promise<void>;
}
