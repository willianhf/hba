import { UniqueIdentifier } from '~/shared/domain';
import { UserName, User } from '../domain';

export interface UserRepository {
  getUserById: (userId: UniqueIdentifier) => Promise<User | null>;
  getUserByUsername: (username: UserName) => Promise<User | null>;
  save: (user: User) => Promise<User>;
  exists: (username: UserName) => Promise<boolean>;
  verify: (userId: UniqueIdentifier) => Promise<void>;
}
