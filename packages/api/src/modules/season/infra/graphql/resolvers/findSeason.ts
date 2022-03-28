import { resolveArrayConnection } from '@pothos/plugin-relay';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { SeasonRef } from '../types/Season';

schemaBuilder.queryFields(t => ({
  seasons: t.connection({
    type: SeasonRef,
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_root, args) => {
      const seasons = await prismaSeasonRepository.findAll();
      return resolveArrayConnection({ args }, seasons);
    }
  }),
  currentSeason: t.field({
    type: SeasonRef,
    authScopes: {
      isLoggedIn: true
    },
    resolve: async () => {
      return prismaSeasonRepository.findCurrent();
    }
  })
}));
