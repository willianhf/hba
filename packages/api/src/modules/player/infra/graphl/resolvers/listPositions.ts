import { prismaPositionRepository } from '~/modules/player/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PositionRef } from '../types/Position';

schemaBuilder.queryField('positions', t =>
  t.field({
    type: [PositionRef],
    authScopes: {
      isLoggedIn: true
    },
    resolve: async () => {
      return prismaPositionRepository.findAll();
    }
  })
);
