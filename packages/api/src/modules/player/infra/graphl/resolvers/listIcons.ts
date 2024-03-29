import { prismaIconRepository } from '~/modules/player/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { IconRef } from '../types/Icon';

schemaBuilder.queryField('icons', t =>
  t.field({
    type: [IconRef],
    resolve: async () => {
      return prismaIconRepository.findAll();
    }
  })
);
