import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain/Player';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  canRequestPlayer(userId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
  isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
}
