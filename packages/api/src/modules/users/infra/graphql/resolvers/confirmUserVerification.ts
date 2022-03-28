import { confirmUserVerificationService } from '~/modules/users/services/ConfirmUserVerification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.relayMutationField(
  'confirmUserVerification',
  { inputFields: () => ({}) },
  {
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_parent, _args, context) => {
      await confirmUserVerificationService.execute({ user: context.user! });

      return { itWorked: true };
    }
  },
  {
    outputFields: t => ({
      itWorked: t.boolean({ resolve: parent => parent.itWorked })
    })
  }
);
