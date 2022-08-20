import { UserId } from '~/modules/users/domain';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain/Player';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: UniqueIdentifier): Promise<Player>;
  canRequestPlayer(userId: UserId, seasonId: IncIdentifier): Promise<boolean>;
  isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
  findByUserAndSeason(userId: UserId, seasonId: IncIdentifier): Promise<Player[]>;
  findAll(seasonId: IncIdentifier): Promise<Player[]>;
  findUserActivePlayer(userId: UserId, seasonId: IncIdentifier): Promise<Player | null>;
}
