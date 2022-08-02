import { applyTeamService } from '~/modules/team/services/ApplyTeam';
import { ApplicationError, AuthenticationError, ValidationError, ValidationInputError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { TeamRef } from '../types/Team';

schemaBuilder.relayMutationField(
  'applyTeam',
  {
    inputFields: t => ({
      nbaTeamId: t.string({ required: true }),
      coCaptainPlayerId: t.string({ required: true })
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
      return applyTeamService.execute({ ...args.input, captainPlayerId: context.user!.id });
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
