import { applyPlayerUseCase } from '~/modules/player/useCases/ApplyPlayer';
import { ApplicationError, AuthenticationError, ValidationInputError } from '~/shared/core/Error';
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
    errors: {
      types: [AuthenticationError, ApplicationError, ValidationInputError]
    },
    resolve: async (_parent, args, context) => {
      return applyPlayerUseCase.execute({ ...args.input, actor: context.user! });
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
