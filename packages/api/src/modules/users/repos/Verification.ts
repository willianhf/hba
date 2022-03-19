import { User } from '../domain';
import { Verification } from '../domain/Verification';

export interface VerificationRepository {
  create(verification: Verification): Promise<Verification>;
  findByUser(user: User): Promise<Verification | null>;
  update(verification: Verification): Promise<void>;
}
