import { makeSeasonCurrentService } from '~/modules/season/services/MakeSeasonCurrent';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { EmptyRef } from '~/shared/infra/graphql/types/Empty';

schemaBuilder.mutationField('makeSeasonCurrent', t =>
  t.authField({
    type: EmptyRef,
    authScopes: {
      isAdmin: true
    },
    args: {
      seasonId: t.arg({ type: 'ID', required: true })
    },
    resolve: async (_parent, args) => {
      await makeSeasonCurrentService.execute({ seasonId: +args.seasonId });

      return { _: true };
    }
  })
);
