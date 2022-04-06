import { loginService } from '~/modules/users/services/Login';
import { ApplicationError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

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
      return loginService.execute({ ...args.input, userAgent: context.userAgent });
    }
  },
  {
    outputFields: t => ({
      token: t.string({ resolve: result => result.token }),
      verificationCode: t.string({ resolve: result => result.verificationCode, nullable: true }),
      user: t.field({ type: UserRef, resolve: result => result.user }),
      sessionId: t.string({ resolve: result => result.sessionId })
    })
  }
);
