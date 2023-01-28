import { applyTeamUseCase } from '~/modules/team/useCases';
import { ActorId } from '~/modules/auth/domain';
import { ApplicationError, AuthenticationError, ValidationError, ValidationInputError } from '~/shared/core/Error';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { TeamRef } from '../types/Team';

schemaBuilder.relayMutationField(
  'applyTeam',
  {
    inputFields: t => ({
      nbaTeamId: t.globalID({ required: true }),
      coCaptainUserId: t.globalID({ required: true })
    })
  },
  {
    authScopes: {
      isLoggedIn: true
    },
    errors: {
      types: [AuthenticationError, ApplicationError, ValidationError, ValidationInputError]
    },
    resolve: async (_parent, args, context) => {
      return applyTeamUseCase.execute({
        nbaTeamId: new UniqueIdentifier(args.input.nbaTeamId.id),
        captainActor: context.user!.id,
        coCaptainActor: new ActorId(args.input.coCaptainUserId.id)
      });
    }
  },
  {
    outputFields: t => ({
      team: t.field({
        type: TeamRef,
        resolve: team => team
      })
    })
  }
);
