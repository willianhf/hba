import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PlayerRef } from '../types/Player';

schemaBuilder.queryField('findUserPlayersBySeason', t =>
  t.authField({
    authScopes: {
      isLoggedIn: true
    },
    type: [PlayerRef],
    resolve: async (_root, _args, context) => {
      const season = await prismaSeasonRepository.findCurrent();
      return prismaPlayerRepository.findByUserAndSeason(context.user.getId(), season.getId());
    }
  })
);
