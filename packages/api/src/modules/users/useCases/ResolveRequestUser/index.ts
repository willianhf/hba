import { prismaSessionRepository } from '../../repos';
import { ResolveRequestUserUseCase } from './UseCase';

export const resolveRequestUserService = new ResolveRequestUserUseCase(prismaSessionRepository);
