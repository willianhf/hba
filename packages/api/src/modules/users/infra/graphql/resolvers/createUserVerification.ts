import { createUserVerificationService } from '~/modules/users/services/CreateUserVerification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { CreateUserVerificationResult } from '../types/CreateUserVerification';

schemaBuilder.mutationFields(t => ({
  createUserVerification: t.authField({
    type: CreateUserVerificationResult,
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_root, _args, context) => {
      const result = await createUserVerificationService.execute({ user: context.user });
      return result;
    }
  })
}));
