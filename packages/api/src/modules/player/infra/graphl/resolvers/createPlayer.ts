import { createPlayerService } from '~/modules/player/services/CreatePlayer';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PlayerRef } from '../types/Player';

const CreatePlayerInput = schemaBuilder.inputType('CreatePlayerInput', {
  fields: t => ({
    nbaPlayerId: t.string({ required: true }),
    positionId: t.string({ required: true }),
    iconsIds: t.stringList({ required: true })
  })
});

schemaBuilder.mutationField('createPlayer', t =>
  t.authField({
    type: PlayerRef,
    args: {
      input: t.arg({ type: CreatePlayerInput, required: true })
    },
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_parent, args, context) => {
      return createPlayerService.execute({ ...args.input, user: context.user });
    }
  })
);
