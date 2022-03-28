import { createPlayerService } from '~/modules/player/services/CreatePlayer';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PlayerRef } from '../types/Player';

schemaBuilder.relayMutationField(
  'createPlayer',
  {
    inputFields: t => ({
      nbaPlayerId: t.string({ required: true }),
      positionId: t.string({ required: true }),
      iconsIds: t.stringList({ required: true })
    })
  },
  {
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_parent, args, context) => {
      return createPlayerService.execute({ ...args.input, user: context.user! });
    }
  },
  {
    outputFields: t => ({
      player: t.field({
        type: PlayerRef,
        resolve: player => player
      })
    })
  }
);
