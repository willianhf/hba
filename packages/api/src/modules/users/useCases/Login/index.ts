import { prismaSessionRepository, prismaUserRepository } from '../../repos';
import { getUserVerificationUseCase } from '../GetUserVerification';
import { LoginUseCase } from './UseCase';

export const loginUseCase = new LoginUseCase(prismaUserRepository, prismaSessionRepository, getUserVerificationUseCase);
