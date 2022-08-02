import { prismaUserRepository } from '../../repos';
import { CreateUserUseCase } from './UseCase';

export const createUserUseCase = new CreateUserUseCase(prismaUserRepository);
