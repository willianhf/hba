import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.queryField('canRequestPlayer', t =>
  t.authField({
    type: 'Boolean',
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_root, _args, context) => {
      const season = await prismaSeasonRepository.findCurrent();
      return prismaPlayerRepository.canRequestPlayer(context.user.getId(), season.getId());
    }
  })
);
