import { prismaUserRepository } from '../../repos';
import { CreateUserService } from './CreateUser';

export const createUserService = new CreateUserService(prismaUserRepository);
