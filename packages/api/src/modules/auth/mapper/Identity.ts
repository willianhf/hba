import { Mapper } from '~/shared/core/Mapper';
import { PersistedIdentity, ToPersistIdentity } from '../database';
import { ActorId, Identity, IdentityId, Password, Username } from '../domain';

export class IdentityMapper extends Mapper<Identity> {
  public static toDomain(persisted: PersistedIdentity): Identity {
    const username = Username.create({ value: persisted.username });
    const password = persisted.password ? Password.create({ value: persisted.password, isHashed: true }) : null;
    const actorId = new ActorId(persisted.actorId);

    return new Identity(
      {
        username,
        password,
        actorId,
        createdAt: persisted.createdAt,
        isVerified: persisted.isVerified
      },
      new IdentityId(persisted.id)
    );
  }

  public static toPersist(domain: Identity): ToPersistIdentity {
    return {
      id: domain.id.toValue(),
      username: domain.username.value,
      password: domain.password?.value,
      actor: {
        connect: {
          id: domain.actorId.toValue()
        }
      }
    };
  }
}
