import { Prisma, Session, User } from '@prisma/client';

export type PersistedUser = User;
export type ToPersistUser = Prisma.UserCreateWithoutSessionsInput;

export type PersistedSession = Session;
export type PersistedSessionWithUser = Session & { user: PersistedUser };
export type ToPersistSession = Prisma.SessionUncheckedCreateInput;
