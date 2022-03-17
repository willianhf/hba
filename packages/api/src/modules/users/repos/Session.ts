import { User } from '../domain';

export interface SessionRepository {
  create: (user: User) => Promise<any>;
}
