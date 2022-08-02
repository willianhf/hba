import { logoutService } from '~/modules/users/useCases/Logout';
import { ApplicationError, AuthenticationError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.relayMutationField(
  'logout',
  {
    inputFields: t => ({
      sessionId: t.string({ required: true })
    })
  },
  {
    authScopes: {
      isLoggedIn: true
    },
    errors: {
      types: [AuthenticationError, ApplicationError]
    },
    resolve: async (_root, args, context) => {
      await logoutService.execute({ user: context.user!, ...args.input });
      return true;
    }
  },
  {
    outputFields: t => ({
      itWorked: t.boolean({ resolve: itWorked => itWorked })
    })
  }
);
