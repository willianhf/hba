import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain/Player';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: UniqueIdentifier): Promise<Player | null>;
  canRequestPlayer(userId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
  isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
}
