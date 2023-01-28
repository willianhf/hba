import { Actor, ActorId } from '~/modules/auth/domain';
import { ActorMapper } from '~/modules/auth/mapper';
import { prisma } from '~/shared/infra/database';
import { ActorRepository } from '../../Actor';

export class PrismaActorRepository implements ActorRepository {
  async create(actor: Actor): Promise<void> {
    const data = ActorMapper.toPersist(actor);

    await prisma.actor.create({ data });
  }

  async findById(id: ActorId): Promise<Actor | null> {
    const prismaActor = await prisma.actor.findUnique({ where: { id: id.toValue() } });
    if (!prismaActor) {
      return null;
    }

    return ActorMapper.toDomain(prismaActor);
  }

  async findAll(): Promise<Actor[]> {
    throw new Error('Method not implemented.');
  }

  async findByHabboUsername(habboUsername: string): Promise<Actor | null> {
    const prismaActor = await prisma.actor.findFirst({ where: { habboUsername } });
    if (!prismaActor) {
      return null;
    }

    return ActorMapper.toDomain(prismaActor);
  }
}
