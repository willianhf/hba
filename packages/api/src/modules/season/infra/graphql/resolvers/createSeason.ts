import { createSeasonService } from '~/modules/season/services/CreateSeason';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { SeasonRef } from '../types/Season';

schemaBuilder.relayMutationField(
  'createSeason',
  {
    inputFields: t => ({
      name: t.string({ required: true }),
      isCurrent: t.boolean({ required: true })
    })
  },
  {
    authScopes: {
      isAdmin: true
    },
    resolve: async (_parent, args) => {
      return createSeasonService.execute(args.input);
    }
  },
  {
    outputFields: t => ({
      season: t.field({
        type: SeasonRef,
        resolve: season => season
      })
    })
  }
);
