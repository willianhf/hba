import { UniqueIdentifier } from '~/shared/domain';
import { UserName, User } from '../domain';

export interface UserRepository {
  getUserById: (userId: UniqueIdentifier) => Promise<User | null>;
  getUserByUsername: (username: UserName) => Promise<User | null>;
  search(search: string) => Promise<User[]>;
  save: (user: User) => Promise<void>;
  exists: (username: UserName) => Promise<boolean>;
  verify: (userId: UniqueIdentifier) => Promise<void>;
}
