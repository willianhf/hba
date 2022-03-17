import { PrismaUserRepository } from './impl/Prisma/User';

export const prismaUserRepository = new PrismaUserRepository();

export { UserRepository } from './User';
