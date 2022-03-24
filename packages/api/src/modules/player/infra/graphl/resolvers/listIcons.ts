import { prismaIconRepository } from '~/modules/player/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { IconRef } from '../types/Icon';

schemaBuilder.queryField('listIcons', t =>
  t.authField({
    type: [IconRef],
    authScopes: {
      isLoggedIn: true
    },
    resolve: async () => {
      return prismaIconRepository.findAll();
    }
  })
);
