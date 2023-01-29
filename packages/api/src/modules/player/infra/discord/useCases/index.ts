import { prismaDiscordChannelRepository } from '~/modules/discord/repos/impl/prisma';
import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { UpdatePlayerInfoChannelUseCase } from './UpdatePlayersInfo';

export const updatePlayerInfoUseCase = new UpdatePlayerInfoChannelUseCase(
  prismaDiscordChannelRepository,
  prismaSeasonRepository,
  prismaPlayerRepository
);
