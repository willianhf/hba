import { resolveArrayConnection } from '@pothos/plugin-relay';
import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PlayerRef } from '../types/Player';

schemaBuilder.queryField('findUserPlayersBySeason', t =>
  t.connection({
    authScopes: {
      isLoggedIn: true
    },
    type: PlayerRef,
    resolve: async (_root, args, context) => {
      const season = await prismaSeasonRepository.findCurrent();
      const players = await prismaPlayerRepository.findByUserAndSeason(context.user!.getId(), season.getId());

      return resolveArrayConnection({ args }, players);
    }
  })
);
