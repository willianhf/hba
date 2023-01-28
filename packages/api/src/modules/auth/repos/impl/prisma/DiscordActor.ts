import { ActorId, DiscordActor, DiscordActorId } from '~/modules/auth/domain';
import { DiscordActorMapper } from '~/modules/auth/mapper';
import { prisma } from '~/shared/infra/database';
import { DiscordActorRepository } from '../../DiscordActor';

export class PrismaDiscordActorRepository implements DiscordActorRepository {
  private static RELATIONS = {
    actor: true
  };

  public async create(discordActor: DiscordActor): Promise<void> {
    const data = DiscordActorMapper.toPersist(discordActor);

    await prisma.discordActor.create({ data });
  }

  public async findById(id: DiscordActorId): Promise<DiscordActor | null> {
    const prismaDiscordActor = await prisma.discordActor.findUnique({
      where: { discordId: id.toValue() },
      include: PrismaDiscordActorRepository.RELATIONS
    });
    if (!prismaDiscordActor) {
      return null;
    }

    return DiscordActorMapper.toDomain(prismaDiscordActor);
  }

  public async findByActorId(actorId: ActorId): Promise<DiscordActor | null> {
    const prismaDiscordActor = await prisma.discordActor.findUnique({
      where: { actorId: actorId.toValue() },
      include: PrismaDiscordActorRepository.RELATIONS
    });
    if (!prismaDiscordActor) {
      return null;
    }

    return DiscordActorMapper.toDomain(prismaDiscordActor);
  }

  public async findAll(): Promise<DiscordActor[]> {
    throw new Error('Method not implemented.');
  }
}
