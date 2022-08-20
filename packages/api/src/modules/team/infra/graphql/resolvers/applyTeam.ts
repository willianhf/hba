import { applyTeamService } from '~/modules/team/services/ApplyTeam';
import { UserId } from '~/modules/users/domain';
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
        captainUserId: context.user!.id,
        coCaptainUserId: new UserId(args.input.coCaptainUserId.id)
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
