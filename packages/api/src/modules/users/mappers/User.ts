import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedUser, PersistanceUser } from '../database';
import { User, UserName, UserPassword } from '../domain';

export class UserMap extends Mapper<User> {
  public static toDomain(persisted: PersistedUser): User {
    const id = new UniqueIdentifier(persisted.id);
    const username = UserName.create({ name: persisted.username });
    const password = UserPassword.create({
      value: persisted.password,
      isHashed: true,
    });

    const user = User.create(
      {
        username: username.getValue(),
        password: password.getValue(),
        isVerified: persisted.isVerified,
        isAdmin: persisted.isAdmin,
      },
      id
    );

    if (user.isFailure()) {
      throw new Error(user.error.toString());
    }

    return user.getValue();
  }

  public static async toPersistence(domain: User): Promise<PersistanceUser> {
    const hashedPassword = await domain.password.getHashedValue();

    return {
      username: domain.username.value,
      password: hashedPassword,
      isVerified: domain.isVerified,
      isAdmin: domain.isAdmin,
    };
  }
}
