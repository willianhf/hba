import { UniqueIdentifier } from '~/shared/domain';
import { UserName, User } from '../domain';

export interface UserRepository {
  getUserById: (userId: UniqueIdentifier) => Promise<User>;
  getUserByUsername: (username: UserName) => Promise<User>;
  save: (user: User) => Promise<User>; 
  exists: (username: UserName) => Promise<boolean>;
}
