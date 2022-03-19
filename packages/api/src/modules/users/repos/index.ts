import { PrismaSessionRepository, PrismaUserRepository, PrismaVerificationRepository } from './impl/Prisma';

export const prismaUserRepository = new PrismaUserRepository();
export const prismaSessionRepository = new PrismaSessionRepository();
export const prismaVerificationRepository = new PrismaVerificationRepository();

export { UserRepository } from './User';
export { SessionRepository } from './Session';
export { VerificationRepository } from './Verification';
