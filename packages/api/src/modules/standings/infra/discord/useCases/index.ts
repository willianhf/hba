import { prismaDiscordChannelRepository } from '~/modules/discord/repos/impl/prisma';
import { prismaMatchRepository } from '~/modules/match/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { UpdateStandingsChannelUseCase } from './UpdateStandingsChannel';

export const updateStandingsChannelUseCase = new UpdateStandingsChannelUseCase(
  prismaDiscordChannelRepository,
  prismaSeasonRepository,
  prismaMatchRepository
);
