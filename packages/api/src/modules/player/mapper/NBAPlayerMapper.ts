import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedNBAPlayer, ToPersistNBAPlayer } from '../database';
import { NBAPlayer } from '../domain';

export class NBAPlayerMapper extends Mapper<NBAPlayer> {
  public static toPersist(domain: NBAPlayer): ToPersistNBAPlayer {
    return {
      id: domain.id.toValue(),
      firstName: domain.firstName,
      lastName: domain.lastName
    };
  }

  public static toDomain(persisted: PersistedNBAPlayer): NBAPlayer {
    return new NBAPlayer(persisted, new UniqueIdentifier(persisted.id));
  }
}
