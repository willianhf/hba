import { prismaVerificationRepository } from '../../repos';
import { CreateUserVerificationUseCase } from './UseCase';

export const createUserVerificationUseCase = new CreateUserVerificationUseCase(prismaVerificationRepository);
