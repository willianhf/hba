import { prisma } from '~/shared/infra/database';
import { User, UserName } from '~/modules/users/domain';
import { UserRepository } from '../..';
import { UserMap } from '~/modules/users/mappers';
import { UniqueIdentifier } from '~/shared/domain';

export class PrismaUserRepository implements UserRepository {
  public async getUserById(userId: UniqueIdentifier): Promise<User> {
    const persistedUser = await prisma.user.findFirst({
      where: { id: userId.toValue() },
      rejectOnNotFound: true,
    });
    const domainUser = UserMap.toDomain(persistedUser);

    return domainUser;
  }

  public async getUserByUsername(username: UserName): Promise<User> {
    const persistedUser = await prisma.user.findFirst({
      where: { username: username.value },
      rejectOnNotFound: true,
    });
    const domainUser = UserMap.toDomain(persistedUser);

    return domainUser;
  }

  public async save(user: User): Promise<User> {
    const persistanceProps = await UserMap.toPersistence(user);

    const persistedUser = await prisma.user.create({ data: persistanceProps });
    const domainUser = UserMap.toDomain(persistedUser);
    
    return domainUser;
  }

  public async exists(username: UserName): Promise<boolean> {
    const persistedUser = await prisma.user.findFirst({
      where: { username: username.value },
      select: { id: true },
    });

    return !!persistedUser;
  }
}
