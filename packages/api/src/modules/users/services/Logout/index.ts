import { prismaSessionRepository } from '../../repos';
import { LogoutService } from './Logout';

export const logoutService = new LogoutService(prismaSessionRepository);
