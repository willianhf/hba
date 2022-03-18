import { prismaSessionRepository, prismaUserRepository } from '../../repos';
import { LoginService } from './Login';

export const loginService = new LoginService(prismaUserRepository, prismaSessionRepository);