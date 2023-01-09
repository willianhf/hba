import { Actor, ActorId } from '~/modules/auth/domain';
import { ActorMapper } from '~/modules/auth/mapper';
import { prisma } from '~/shared/infra/database';
import { ActorRepository } from '../../Actor';

export class PrismaActorRepository implements ActorRepository {
  async create(actor: Actor): Promise<void> {
    const data = ActorMapper.toPersist(actor);

    await prisma.actor.create({ data });
  }

  async findById(_id: ActorId): Promise<Actor | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Actor[]> {
    throw new Error('Method not implemented.');
  }
}
