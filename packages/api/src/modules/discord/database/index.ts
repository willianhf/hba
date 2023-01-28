import { Prisma } from '@prisma/client';
export {
  DiscordChannel as PersistedDiscordChannel,
  DiscordChannelMessage as PersistedDiscordChannelMessage,
  DiscordRole as PersistedDiscordRole
} from '@prisma/client';

export type ToPersistDiscordChannel = Prisma.DiscordChannelUncheckedCreateInput;

export type ToPersistDiscordRole = Prisma.DiscordRoleUncheckedCreateInput;

export type ToPersistDiscordChannelMessage = Prisma.DiscordChannelMessageUncheckedCreateInput;
