import { Actor, DiscordActor, Prisma } from '@prisma/client';
export { Actor as PersistedActor, Identity as PersistedIdentity } from '@prisma/client';

export type PersistedDiscordActor = DiscordActor & {
  actor: Actor;
};

export type ToPersistActor = Prisma.ActorCreateInput;
export type ToPersistIdentity = Prisma.IdentityCreateInput;
export type ToPersistDiscordActor = Prisma.DiscordActorCreateInput;
