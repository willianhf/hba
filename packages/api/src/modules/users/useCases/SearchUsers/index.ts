import { prismaUserRepository } from '../../repos';
import { SearchUsersUseCase } from './UseCase';

export const searchUsersUseCase = new SearchUsersUseCase(prismaUserRepository);

