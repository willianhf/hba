import { Mapper } from '~/shared/core/Mapper';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedPlayer, ToPersistPlayer } from '../database';
import { Player } from '../domain/Player';

export class PlayerMapper extends Mapper<Player> {
  public static toPersist(domain: Player): ToPersistPlayer {
    return {
      userId: domain.userId.toValue(),
      seasonId: domain.seasonId.toValue(),
      nbaPlayerId: domain.nbaPlayerId.toValue(),
      positionId: domain.positionId.toValue(),
      icons: {
        createMany: {
          data: domain.iconIds.map(id => ({ iconId: id.toValue() }))
        }
      }
    };
  }

  public static toDomain(persisted: PersistedPlayer): Player {
    const playerId = new UniqueIdentifier(persisted.id);
    const userId = new UniqueIdentifier(persisted.userId);
    const seasonId = new IncIdentifier(persisted.seasonId);
    const nbaPlayerId = new UniqueIdentifier(persisted.nbaPlayerId);
    const positionId = new UniqueIdentifier(persisted.positionId);

    const iconIds = persisted.icons.map(icon => new UniqueIdentifier(icon.iconId));

    return Player.create(
      {
        userId,
        seasonId,
        nbaPlayerId,
        positionId,
        iconIds,
        approvalStatus: persisted.status
      },
      playerId
    );
  }
}
