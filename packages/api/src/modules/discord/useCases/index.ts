import { prismaDiscordChannelRepository, prismaDiscordRoleRepository } from '../repos/impl/prisma';
import { SetDiscordChannelCategoryUseCase } from './SetChannelCategory';
import { SetDiscordRoleCategoryUseCase } from './SetRoleCategory';

export const setDiscordChannelCategoryUseCase = new SetDiscordChannelCategoryUseCase(prismaDiscordChannelRepository);
export const setDiscordRoleCategoryUseCase = new SetDiscordRoleCategoryUseCase(prismaDiscordRoleRepository);
