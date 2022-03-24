import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { NBAPlayer } from '../domain/NBAPlayer';

export interface NBAPlayerRepository {
  findById(id: UniqueIdentifier): Promise<NBAPlayer | null>;
  create(nbaPlayer: NBAPlayer): Promise<NBAPlayer>;
}
