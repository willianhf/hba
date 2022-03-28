import { makeSeasonCurrentService } from '~/modules/season/services/MakeSeasonCurrent';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.relayMutationField(
  'makeSeasonCurrent',
  {
    inputFields: t => ({
      seasonId: t.id({ required: true })
    })
  },
  {
    authScopes: {
      isAdmin: true
    },
    resolve: async (_parent, args) => {
      await makeSeasonCurrentService.execute({ seasonId: +args.input.seasonId });
    }
  },
  {
    outputFields: t => ({
      itWorked: t.boolean({ resolve: () => true })
    })
  }
);
