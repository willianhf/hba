import { prismaDiscordChannelRepository } from '~/modules/discord/repos/impl/prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { UpdateTeamsChannelUseCase } from './UpdateTeamsChannel';

export const updateTeamsChannelUseCase = new UpdateTeamsChannelUseCase(
  prismaDiscordChannelRepository,
  prismaSeasonRepository,
  prismaTeamRepository
);
