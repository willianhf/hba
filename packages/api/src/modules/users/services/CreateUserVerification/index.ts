import { prismaVerificationRepository } from '../../repos';
import { CreateUserVerificationService } from './CreateUserVerification';

export const createUserVerificationService = new CreateUserVerificationService(prismaVerificationRepository);
