import { ActorId } from '~/modules/auth/domain';
import { SeasonId } from '~/modules/season/domain';
import { UniqueIdentifier } from '~/shared/domain';
import { ApprovalStatus, Player } from '../domain';

export interface PlayerRepository {
  create(player: Player): Promise<void>;
  update(player: Player): Promise<void>;
  findById(id: UniqueIdentifier): Promise<Player | null>;
  canRequestPlayer(actorId: ActorId, seasonId: SeasonId): Promise<boolean>;
  isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: SeasonId): Promise<boolean>;
  findByActorAndSeason(actorId: ActorId, seasonId: SeasonId): Promise<Player[]>;
  findAll(seasonId: SeasonId): Promise<Player[]>;
  findByStatus(seasonId: SeasonId, status: ApprovalStatus): Promise<Player[]>;
  findActorActivePlayer(actorId: ActorId, seasonId: SeasonId): Promise<Player | null>;
}
