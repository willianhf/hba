import { Verification, Prisma, Session, User } from '@prisma/client';

export type PersistedUser = User;
export type ToPersistUser = Prisma.UserCreateWithoutSessionsInput;

export type PersistedSessionWithUser = Session & { user: PersistedUser };
export type ToPersistSession = Prisma.SessionUncheckedCreateInput;

export type PersistedVerificationWithUser = Verification & { user: PersistedUser };
export type ToPersistVerification = Prisma.VerificationUncheckedCreateInput;
