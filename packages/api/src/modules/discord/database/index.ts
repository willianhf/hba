import { Prisma } from '@prisma/client';
export { DiscordChannel as PersistedDiscordChannel, DiscordRole as PersistedDiscordRole } from '@prisma/client';

export type ToPersistDiscordChannel = Prisma.DiscordChannelCreateInput;

export type ToPersistDiscordRole = Prisma.DiscordRoleCreateInput;
