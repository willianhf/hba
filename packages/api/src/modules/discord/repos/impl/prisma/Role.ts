import { DiscordRoleCategory } from '@prisma/client';
import { DiscordRole, DiscordRoleId } from '~/modules/discord/domain';
import { DiscordRoleMapper } from '~/modules/discord/mapper';
import { prisma } from '~/shared/infra/database';
import { DiscordRoleRepository } from '../../';

export class PrismaDiscordRoleRepository implements DiscordRoleRepository {
  async upsert(discordRole: DiscordRole): Promise<void> {
    const data = DiscordRoleMapper.toPersistence(discordRole);
    await prisma.discordRole.upsert({
      create: data,
      update: data,
      where: {
        category: discordRole.category
      }
    });
  }

  async create(_: DiscordRole): Promise<void> {
    throw new Error('Method not implemented');
  }

  async findById(_: DiscordRoleId): Promise<DiscordRole | null> {
    throw new Error('Method not implemented');
  }

  async findAll(): Promise<DiscordRole[]> {
    throw new Error('Method not implemented');
  }

  async findMany(...categories: DiscordRoleCategory[]): Promise<DiscordRole[]> {
    const prismaDiscordRoles = await prisma.discordRole.findMany({
      where: {
        category: {
          in: [...categories]
        }
      }
    });

    return prismaDiscordRoles.map(DiscordRoleMapper.toDomain);
  }

  async findByCategory(category: DiscordRoleCategory): Promise<DiscordRole | null> {
    const prismaDiscordRole = await prisma.discordRole.findFirst({ where: { category } });
    if (!prismaDiscordRole) {
      return null;
    }

    return DiscordRoleMapper.toDomain(prismaDiscordRole);
  }
}
