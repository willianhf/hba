import { DiscordActor } from '~/modules/auth/domain';
import { DiscordActorMapper } from '~/modules/auth/mapper';
import { prisma } from '~/shared/infra/database';
import { DiscordActorRepository } from '../../DiscordActor';

export class PrismaDiscordActorRepository implements DiscordActorRepository {
  async create(discordActor: DiscordActor): Promise<void> {
    const data = DiscordActorMapper.toPersist(discordActor);

    await prisma.discordActor.create({ data });
  }

  async findById(): Promise<DiscordActor | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<DiscordActor[]> {
    throw new Error('Method not implemented.');
  }
}
