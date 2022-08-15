import { prismaUserRepository } from '../../repos';
import { FetchUserUseCase } from './UseCase';

export const fetchUserUseCase = new FetchUserUseCase(prismaUserRepository);
