import { searchUsersUseCase } from '~/modules/users/useCases/SearchUsers';
import { AuthenticationError } from '~/shared/core';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

schemaBuilder.queryField('searchUsers', t =>
  t.authField({
    type: [UserRef],
    authScopes: {
      isLoggedIn: true
    },
    errors: {
      types: [AuthenticationError]
    },
    args: {
      search: t.arg({ type: 'String', required: true })
    },
    resolve: async (_root, args) => {
      const { users } = await searchUsersUseCase.execute({ search: args.search });
      return users;
    }
  })
);
