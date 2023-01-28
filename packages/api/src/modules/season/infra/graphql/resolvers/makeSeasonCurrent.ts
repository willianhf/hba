import { makeSeasonCurrentService } from '~/modules/season/services/MakeSeasonCurrent';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.relayMutationField(
  'makeSeasonCurrent',
  {
    inputFields: t => ({
      seasonName: t.string({ required: true })
    })
  },
  {
    authScopes: {
      isAdmin: true
    },
    resolve: async (_parent, args) => {
      await makeSeasonCurrentService.execute({ name: args.input.seasonName });
    }
  },
  {
    outputFields: t => ({
      itWorked: t.boolean({ resolve: () => true })
    })
  }
);
