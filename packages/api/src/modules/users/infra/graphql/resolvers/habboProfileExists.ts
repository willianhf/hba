import { HabboAPIFacade } from '~/modules/users/facades/HabboAPI';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.queryField('habboProfileExists', t =>
  t.boolean({
    args: {
      username: t.arg({ type: 'String', required: true })
    },
    resolve: async (_root, args) => {
      return HabboAPIFacade.exists(args.username);
    }
  })
);
