import { NBAAPIFacade } from '~/modules/users/facades/NBAAPI';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { NBAPlayerRef } from '../types/NBAPlayer';

schemaBuilder.queryField('listNBAPlayers', t =>
  t.authField({
    type: [NBAPlayerRef],
    authScopes: {
      isLoggedIn: true
    },
    args: {
      search: t.arg({ type: 'String', required: true })
    },
    resolve: async (_parent, args) => {
      return NBAAPIFacade.fetchPlayers(args.search);
    }
  })
);
