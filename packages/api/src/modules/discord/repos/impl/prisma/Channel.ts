import { DiscordChannel, DiscordChannelCategory, DiscordChannelId } from '~/modules/discord/domain';
import { DiscordChannelMapper } from '~/modules/discord/mapper';
import { prisma } from '~/shared/infra/database';
import { DiscordChannelRepository } from '../../';

export class PrismaDiscordChannelRepository implements DiscordChannelRepository {
  async upsert(discordChannel: DiscordChannel): Promise<void> {
    const data = DiscordChannelMapper.toPersistence(discordChannel);
    await prisma.discordChannel.upsert({
      create: data,
      update: data,
      where: {
        category: discordChannel.category
      }
    });
  }

  async create(_: DiscordChannel): Promise<void> {
    throw new Error('Method not implemented');
  }

  async findById(_: DiscordChannelId): Promise<DiscordChannel | null> {
    throw new Error('Method not implemented');
  }

  async findAll(): Promise<DiscordChannel[]> {
    throw new Error('Method not implemented');
  }

  async findByCategory(category: DiscordChannelCategory): Promise<DiscordChannel | null> {
    const prismaDiscordChannel = await prisma.discordChannel.findFirst({ where: { category } });
    if (!prismaDiscordChannel) {
      return null;
    }

    return DiscordChannelMapper.toDomain(prismaDiscordChannel);
  }
}
