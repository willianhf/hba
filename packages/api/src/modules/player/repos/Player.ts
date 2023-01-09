import { ActorId } from '~/modules/auth/domain';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain/Player';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: UniqueIdentifier): Promise<Player>;
  canRequestPlayer(actorId: ActorId, seasonId: IncIdentifier): Promise<boolean>;
  isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
  findByActorAndSeason(actorId: ActorId, seasonId: IncIdentifier): Promise<Player[]>;
  findAll(seasonId: IncIdentifier): Promise<Player[]>;
  findActorActivePlayer(actorId: ActorId, seasonId: IncIdentifier): Promise<Player | null>;
}
