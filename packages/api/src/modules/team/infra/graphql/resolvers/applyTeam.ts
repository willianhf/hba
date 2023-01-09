import { applyTeamService } from '~/modules/team/services/ApplyTeam';
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
      return applyTeamService.execute({
        nbaTeamId: new UniqueIdentifier(args.input.nbaTeamId.id),
        captainActorId: context.user!.id,
        coCaptainActorId: new ActorId(args.input.coCaptainUserId.id)
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
