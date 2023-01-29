import { DiscordChannelCategory, DiscordChannelMessage, DiscordChannelMessageId } from '~/modules/discord/domain';
import { DiscordChannelMessageMapper } from '~/modules/discord/mapper';
import { Season } from '~/modules/season/domain';
import { prisma } from '~/shared/infra/database';
import { DiscordChannelMessageRepository } from '../../';

export class PrismaDiscordChannelMessageRepository implements DiscordChannelMessageRepository {
  async create(domain: DiscordChannelMessage): Promise<void> {
    const data = DiscordChannelMessageMapper.toPersistence(domain);
    await prisma.discordChannelMessage.create({ data });
  }

  async findById(_: DiscordChannelMessageId): Promise<DiscordChannelMessage | null> {
    throw new Error('Method not implemented');
  }

  async findAll(): Promise<DiscordChannelMessage[]> {
    throw new Error('Method not implemented');
  }

  public async findByCategory(season: Season, category: DiscordChannelCategory): Promise<DiscordChannelMessage[]> {
    const prismaDiscordChannelMessages = await prisma.discordChannelMessage.findMany({
      where: {
        category,
        seasonId: season.id.toValue()
      }
    });

    return prismaDiscordChannelMessages.map(DiscordChannelMessageMapper.toDomain);
  }

  public async deleteByCategory(season: Season, category: DiscordChannelCategory): Promise<void> {
    await prisma.discordChannelMessage.deleteMany({
      where: {
        seasonId: season.id.toValue(),
        category
      }
    });
  }
}
