import { PrismaDiscordChannelRepository } from './Channel';
import { PrismaDiscordChannelMessageRepository } from './ChannelMessage';
import { PrismaDiscordRoleRepository } from './Role';

export const prismaDiscordChannelRepository = new PrismaDiscordChannelRepository();
export const prismaDiscordRoleRepository = new PrismaDiscordRoleRepository();
export const prismaDiscordChannelMessageRepository = new PrismaDiscordChannelMessageRepository();
