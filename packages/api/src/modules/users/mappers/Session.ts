import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedSession, PersistedSessionWithUser, ToPersistSession } from '../database';
import { Session, User } from '../domain';
import { UserMap } from './User';

export class SessionMapper extends Mapper<Session> {
  public static toDomain(persisted: PersistedSessionWithUser): Session {
    const sessionId = new UniqueIdentifier(persisted.id);
    const user = UserMap.toDomain(persisted.user);

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
      userId: domain.user.getId().toValue(),
      userAgent: domain.userAgent,
      createdAt: domain.createdAt
    };
  }
}
