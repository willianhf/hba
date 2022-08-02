import { confirmUserVerificationUseCase } from '~/modules/users/useCases/ConfirmUserVerification';
import { ApplicationError, AuthenticationError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

schemaBuilder.relayMutationField(
  'confirmUserVerification',
  { inputFields: () => ({}) },
  {
    authScopes: {
      isLoggedIn: true
    },
    errors: {
      types: [AuthenticationError, ApplicationError]
    },
    resolve: async (_parent, _args, context) => {
      await confirmUserVerificationUseCase.execute({ user: context.user! });

      return { itWorked: true, user: context.user! };
    }
  },
  {
    outputFields: t => ({
      itWorked: t.boolean({ resolve: result => result.itWorked }),
      user: t.field({ type: UserRef, resolve: result => result.user })
    })
  }
);
