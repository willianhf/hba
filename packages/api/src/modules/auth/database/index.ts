import { Prisma } from '@prisma/client';
export {
  Actor as PersistedActor,
  DiscordActor as PersistedDiscordActor,
  Identity as PersistedIdentity
} from '@prisma/client';

export type ToPersistActor = Prisma.ActorCreateInput;
export type ToPersistIdentity = Prisma.IdentityCreateInput;
export type ToPersistDiscordActor = Prisma.DiscordActorCreateInput;
