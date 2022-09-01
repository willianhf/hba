import { User, UserId, UserName } from '../domain';

export interface UserRepository {
  findById: (userId: UserId) => Promise<User>;
  findByUsername: (username: UserName) => Promise<User | null>;
  search: (search: string) => Promise<User[]>;
  save: (user: User) => Promise<void>;
  exists: (username: UserName) => Promise<boolean>;
  habboUsernameIsTaken: (habboUsername: string) => Promise<boolean>;
  verify: (userId: UserId) => Promise<void>;
}
