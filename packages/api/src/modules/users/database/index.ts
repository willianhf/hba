import { Prisma, User } from '@prisma/client';

export type PersistedUser = User;
export type PersistanceUser = Prisma.UserCreateWithoutSessionsInput;
