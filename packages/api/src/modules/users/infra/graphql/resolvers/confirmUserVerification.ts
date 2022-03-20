import { confirmUserVerificationService } from '~/modules/users/services/ConfirmUserVerification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { ConfirmUserVerificationResult } from '../types/ConfirmUserVerification';

schemaBuilder.mutationField('confirmUserVerification', t =>
  t.authField({
    type: ConfirmUserVerificationResult,
    authScopes: {
      isLoggedIn: true
    },
    resolve: async (_parent, _args, context) => {
      await confirmUserVerificationService.execute({ user: context.user });

      return { _: true };
    }
  })
);
