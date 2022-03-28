import { createUserVerificationService } from '~/modules/users/services/CreateUserVerification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

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
      const result = await createUserVerificationService.execute({ user: context.user! });
      return result;
    }
  },
  {
    outputFields: t => ({
      verificationCode: t.string({
        resolve: result => result.verificationCode
      })
    })
  }
);
