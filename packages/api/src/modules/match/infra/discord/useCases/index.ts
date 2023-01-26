import { prismaDiscordChannelRepository } from '~/modules/discord/repos/impl/prisma';
import { AnnounceMatchResultUseCase } from './AnnounceMatchResult';

export const announceMatchResultUseCase = new AnnounceMatchResultUseCase(prismaDiscordChannelRepository);
