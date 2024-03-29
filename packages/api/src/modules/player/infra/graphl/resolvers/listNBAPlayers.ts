import { NBAAPIFacade } from '~/modules/player/facades/NBAAPI';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { NBAPlayerRef } from '../types/NBAPlayer';

schemaBuilder.queryField('nbaPlayers', t =>
  t.field({
    type: [NBAPlayerRef],
    authScopes: {
      isLoggedIn: true
    },
    args: {
      search: t.arg({ type: 'String', required: true })
    },
    resolve: async (_parent, args) => {
      return NBAAPIFacade.fetchPlayersByName(args.search);
    }
  })
);
