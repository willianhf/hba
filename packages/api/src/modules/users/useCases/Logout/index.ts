import { prismaSessionRepository } from '../../repos';
import { LogoutUseCase } from './UseCase';

export const logoutService = new LogoutUseCase(prismaSessionRepository);
