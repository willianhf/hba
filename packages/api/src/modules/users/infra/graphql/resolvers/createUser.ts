import { createUserService } from '~/modules/users/services/CreateUser';
import { ValidationInputError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

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
    resolve: async (_root, args, context) => {
      return createUserService.execute({ ...args.input, userAgent: context.userAgent });
    }
  },
  {
    outputFields: t => ({
      verificationCode: t.string({ resolve: result => result.verificationCode }),
      jwtToken: t.string({ resolve: result => result.jwtToken }),
      user: t.field({ type: UserRef, resolve: result => result.user }),
      sessionId: t.string({ resolve: result => result.sessionId })
    })
  }
);
