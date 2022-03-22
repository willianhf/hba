import { createSeasonService } from '~/modules/season/services/CreateSeason';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { SeasonRef } from '../types/Season';

schemaBuilder.mutationField('createSeason', t =>
  t.authField({
    type: SeasonRef,
    authScopes: {
      isAdmin: true
    },
    args: {
      name: t.arg({ type: 'String', required: true }),
      isCurrent: t.arg({ type: 'Boolean', required: true })
    },
    resolve: async (_parent, args) => {
      return createSeasonService.execute(args);
    }
  })
);
