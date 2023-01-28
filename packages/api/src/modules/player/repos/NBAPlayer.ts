import { UniqueIdentifier } from '~/shared/domain';
import { NBAPlayer } from '../domain';

export interface NBAPlayerRepository {
  findById(id: UniqueIdentifier): Promise<NBAPlayer | null>;
  create(nbaPlayer: NBAPlayer): Promise<NBAPlayer>;
}
