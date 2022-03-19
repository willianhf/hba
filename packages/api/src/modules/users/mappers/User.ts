import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedUser, ToPersistUser } from '../database';
import { User, UserName, UserPassword } from '../domain';

export class UserMapper extends Mapper<User> {
  public static toDomain(persisted: PersistedUser): User {
    const id = new UniqueIdentifier(persisted.id);
    const username = UserName.create({ name: persisted.username });
    const password = UserPassword.create({
      value: persisted.password,
      isHashed: true
    });

    const user = User.create(
      {
        username: username,
        password: password,
        isVerified: persisted.isVerified,
        isAdmin: persisted.isAdmin,
        createdAt: persisted.createdAt
      },
      id
    );

    return user;
  }

  public static async toPersistence(domain: User): Promise<ToPersistUser> {
    const hashedPassword = await domain.password.getHashedValue();

    return {
      username: domain.username.value,
      password: hashedPassword,
      isVerified: domain.isVerified,
      isAdmin: domain.isAdmin
    };
  }
}
