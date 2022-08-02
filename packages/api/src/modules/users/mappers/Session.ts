import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedSessionWithUser, ToPersistSession } from '../database';
import { Session } from '../domain';
import { UserMapper } from './User';

export class SessionMapper extends Mapper<Session> {
  public static toDomain(persisted: PersistedSessionWithUser): Session {
    const sessionId = new UniqueIdentifier(persisted.id);
    const user = UserMapper.toDomain(persisted.user);

    const session = Session.create(
      {
        user,
        userAgent: persisted.userAgent,
        createdAt: persisted.createdAt
      },
      sessionId
    );

    return session;
  }

  public static toPersistance(domain: Session): ToPersistSession {
    return {
      id: domain.id.toValue(),
      userId: domain.user.id.toValue(),
      userAgent: domain.userAgent,
      createdAt: domain.createdAt
    };
  }
}
