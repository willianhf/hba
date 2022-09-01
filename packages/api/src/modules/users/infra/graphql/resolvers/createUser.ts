import { createUserUseCase } from '~/modules/users/useCases/CreateUser';
import { ValidationInputError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { SessionRef, UserRef, VerificationRef } from '../types';

schemaBuilder.relayMutationField(
  'createUser',
  {
    inputFields: t => ({
      username: t.string({ required: true }),
      password: t.string({ required: true }),
      habboUsername: t.string({ required: true })
    })
  },
  {
    errors: {
      types: [ValidationInputError]
    },
    resolve: async (_root, args, context) => {
      return createUserUseCase.execute({ ...args.input, userAgent: context.userAgent });
    }
  },
  {
    outputFields: t => ({
      token: t.string({ resolve: result => result.token }),
      verification: t.field({ type: VerificationRef, resolve: result => result.verification }),
      user: t.field({ type: UserRef, resolve: result => result.user }),
      session: t.field({ type: SessionRef, resolve: result => result.session })
    })
  }
);
