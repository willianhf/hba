import { loginUseCase } from '~/modules/users/useCases/Login';
import { ApplicationError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { SessionRef, UserRef, VerificationRef } from '../types';

schemaBuilder.relayMutationField(
  'login',
  {
    inputFields: t => ({
      username: t.string({ required: true }),
      password: t.string({ required: true })
    })
  },
  {
    errors: {
      types: [ApplicationError]
    },
    resolve: async (_root, args, context) => {
      return loginUseCase.execute({ ...args.input, userAgent: context.userAgent });
    }
  },
  {
    outputFields: t => ({
      token: t.string({ resolve: result => result.token }),
      verification: t.field({ type: VerificationRef, resolve: result => result.verification, nullable: true }),
      user: t.field({ type: UserRef, resolve: result => result.user }),
      session: t.field({ type: SessionRef, resolve: result => result.session })
    })
  }
);
