import { confirmUserVerificationService } from '~/modules/users/services/ConfirmUserVerification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { EmptyRef } from '~/shared/infra/graphql/types/Empty';

schemaBuilder.mutationField('confirmUserVerification', t =>
  t.authField({
    type: EmptyRef,
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_parent, _args, context) => {
      await confirmUserVerificationService.execute({ user: context.user });

      return { _: true };
    }
  })
);
