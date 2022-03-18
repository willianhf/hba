import { PrismaSessionRepository } from './impl/Prisma/Session';
import { PrismaUserRepository } from './impl/Prisma/User';

export const prismaUserRepository = new PrismaUserRepository();
export const prismaSessionRepository = new PrismaSessionRepository();

export { UserRepository } from './User';
export { SessionRepository } from './Session';
