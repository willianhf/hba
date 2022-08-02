import { createUserVerificationUseCase } from '~/modules/users/useCases/CreateUserVerification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { VerificationRef } from '../types';

schemaBuilder.relayMutationField(
  'createUserVerification',
  {
    inputFields: () => ({})
  },
  {
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_root, _args, context) => {
      return createUserVerificationUseCase.execute({ user: context.user! });
    }
  },
  {
    outputFields: t => ({
      verification: t.field({ type: VerificationRef, resolve: verification => verification })
    })
  }
);
