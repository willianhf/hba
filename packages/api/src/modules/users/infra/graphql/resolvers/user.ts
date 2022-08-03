import { prismaUserRepository } from '~/modules/users/repos';
import { AuthenticationError } from '~/shared/core';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

schemaBuilder.queryField('user', t =>
  t.authField({
    type: UserRef,
    authScopes: {
      isLoggedIn: true
    },
    errors: {
      types: [AuthenticationError]
    },
    resolve: async (_root, _args, context) => {
      const user = await prismaUserRepository.getUserById(context.user.id);
      return user!;
    }
  })
);
