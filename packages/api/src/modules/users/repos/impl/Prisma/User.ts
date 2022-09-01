import { User, UserId, UserName } from '~/modules/users/domain';
import { UserMapper } from '~/modules/users/mappers';
import { prisma } from '~/shared/infra/database';
import { UserRepository } from '../..';

export class PrismaUserRepository implements UserRepository {
  public async findById(userId: UserId): Promise<User> {
    const persistedUser = await prisma.user.findFirst({
      where: {
        id: userId.toValue()
      },
      rejectOnNotFound: true
    });

    return UserMapper.toDomain(persistedUser);
  }

  public async findByUsername(username: UserName): Promise<User | null> {
    const persistedUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username.value,
          mode: 'insensitive'
        }
      }
    });

    if (persistedUser) {
      return UserMapper.toDomain(persistedUser);
    }

    return null;
  }

  public async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.upsert({
      where: { username: data.username },
      create: data,
      update: data
    });
  }

  public async exists(username: UserName): Promise<boolean> {
    const persistedUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username.value,
          mode: 'insensitive'
        },
        isVerified: true
      },
      select: {
        id: true
      }
    });

    return !!persistedUser;
  }

  public async verify(userId: UserId): Promise<void> {
    await prisma.user.update({
      where: { id: userId.toValue() },
      data: { isVerified: true }
    });
  }

  public async search(search: string): Promise<User[]> {
    const prismaUsers = await prisma.user.findMany({
      where: {
        username: {
          contains: search,
          mode: 'insensitive'
        }
      }
    });

    return prismaUsers.map(prismaUser => UserMapper.toDomain(prismaUser));
  }

  public async habboUsernameIsTaken(habboUsername: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: {
        habboUsername: {
          equals: habboUsername,
          mode: 'insensitive'
        },
        isVerified: true
      }
    });

    return count > 0;
  }
}
