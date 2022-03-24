import { prismaSeasonRepository } from '~/modules/season/repos';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { SeasonRef } from '../types/Season';

schemaBuilder.queryFields(t => ({
  findAll: t.authField({
    type: [SeasonRef],
    authScopes: {
      isLoggedIn: true
    },
    resolve: async () => {
      return prismaSeasonRepository.findAll();
    }
  }),
  findCurrent: t.authField({
    type: SeasonRef,
    authScopes: {
      isLoggedIn: true
    },
    resolve: async () => {
      return prismaSeasonRepository.findCurrent();
    }
  })
}));
