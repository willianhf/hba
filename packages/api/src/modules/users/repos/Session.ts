import { UniqueIdentifier } from '~/shared/domain';
import { Session } from '../domain';

export interface SessionRepository {
  getById(sessionId: UniqueIdentifier): Promise<Session | null>;
  getByUserId(userId: UniqueIdentifier): Promise<Session[]>;
  create(session: Session): Promise<Session>;
  delete(session: Session): Promise<void>;
}
