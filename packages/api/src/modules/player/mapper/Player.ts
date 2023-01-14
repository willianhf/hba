import { ActorMapper } from '~/modules/auth/mapper';
import { Mapper } from '~/shared/core/Mapper';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedPlayer, ToPersistPlayer } from '../database';
import { Icons, Player } from '../domain';
import { NBAPlayerMapper } from './NBAPlayerMapper';
import { PlayerIconMapper } from './PlayerIconMapper';
import { PositionMapper } from './PositionMapper';

export class PlayerMapper extends Mapper<Player> {
  public static toPersist(domain: Player): ToPersistPlayer {
    return {
      id: domain.id.toValue(),
      actorId: domain.actor.id.toValue(),
      seasonId: domain.seasonId.toValue(),
      nbaPlayerId: domain.nbaPlayer.id.toValue(),
      positionId: domain.position.id.toValue(),
      status: domain.status,
    };
  }

  public static toDomain(persisted: PersistedPlayer): Player {
    const playerId = new UniqueIdentifier(persisted.id);
    const actor = ActorMapper.toDomain(persisted.actor);
    const seasonId = new IncIdentifier(persisted.seasonId);
    const nbaPlayer = NBAPlayerMapper.toDomain(persisted.nbaPlayer);
    const position = PositionMapper.toDomain(persisted.position);

    const icons = new Icons(persisted.icons.map(PlayerIconMapper.toDomain));

    return new Player(
      {
        actor,
        seasonId,
        nbaPlayer,
        position,
        icons,
        status: persisted.status
      },
      playerId
    );
  }
}
