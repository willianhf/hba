import {
  prismaDiscordChannelMessageRepository,
  prismaDiscordChannelRepository,
  prismaDiscordRoleRepository
} from '../repos/impl/prisma';
import { DeleteChannelMessagesUseCase } from './DeleteChannelMessages';
import { SetDiscordChannelCategoryUseCase } from './SetChannelCategory';
import { SetDiscordRoleCategoryUseCase } from './SetRoleCategory';
import { SyncChannelMessageUseCase } from './SyncChannelMessage';

export const setDiscordChannelCategoryUseCase = new SetDiscordChannelCategoryUseCase(prismaDiscordChannelRepository);
export const setDiscordRoleCategoryUseCase = new SetDiscordRoleCategoryUseCase(prismaDiscordRoleRepository);
export const deleteChannelMessagesUseCase = new DeleteChannelMessagesUseCase(prismaDiscordChannelMessageRepository);
export const syncChannelMessageUseCase = new SyncChannelMessageUseCase(prismaDiscordChannelMessageRepository);
