import { prismaPositionRepository } from '~/modules/player/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PositionRef } from '../types/Position';

schemaBuilder.queryField('listPositions', t =>
  t.authField({
    type: [PositionRef],
    authScopes: {
      isLoggedIn: true
    },
    resolve: async () => {
      return prismaPositionRepository.findAll();
    }
  })
);
