import { Session } from '~/modules/users/domain';
import { SessionMapper } from '~/modules/users/mappers';
import { UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { SessionRepository } from '../../';

export class PrismaSessionRepository implements SessionRepository {
  public async getById(sessionId: UniqueIdentifier): Promise<Session | null> {
    const persistedSession = await prisma.session.findFirst({
      where: { id: sessionId.toValue() },
      include: { user: true }
    });

    if (persistedSession) {
      return SessionMapper.toDomain(persistedSession);
    }

    return null;
  }

  public async create(session: Session): Promise<void> {
    const toPersistSession = SessionMapper.toPersistance(session);

    await prisma.session.create({ data: toPersistSession, include: { user: true } });
  }

  public async getByUserId(userId: UniqueIdentifier): Promise<Session[]> {
    const userSessions = await prisma.session.findMany({
      where: { userId: userId.toValue() },
      include: { user: true }
    });

    return userSessions.map(SessionMapper.toDomain);
  }

  public async delete(session: Session): Promise<void> {
    await prisma.session.delete({
      where: { id: session.id.toValue() }
    });
  }
}
