import { createUserUseCase } from '~/modules/users/useCases/CreateUser';
import { ValidationInputError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef, VerificationRef } from '../types';

schemaBuilder.relayMutationField(
  'createUser',
  {
    inputFields: t => ({
      username: t.string({ required: true }),
      password: t.string({ required: true })
    })
  },
  {
    errors: {
      types: [ValidationInputError]
    },
    resolve: async (_root, args) => {
      return createUserUseCase.execute(args.input);
    }
  },
  {
    outputFields: t => ({
      verification: t.field({ type: VerificationRef, resolve: result => result.verification }),
      user: t.field({ type: UserRef, resolve: result => result.user })
    })
  }
);
