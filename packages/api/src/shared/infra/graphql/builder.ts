import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import RelayPlugin from '@pothos/plugin-relay';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { User } from '~/modules/users/domain';

type Context = {
  userAgent: string;
  user: User | null;
};

type SchemaBuilderConfig = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  Context: Context;
  AuthScopes: {
    isLoggedIn: boolean;
    isAdmin: boolean;
  };
  AuthContexts: {
    isLoggedIn: Context & { user: User };
    isAdmin: Context & { user: User };
  };
};

export const schemaBuilder = new SchemaBuilder<SchemaBuilderConfig>({
  plugins: [ScopeAuthPlugin, SimpleObjectsPlugin, RelayPlugin],
  authScopes: async context => ({
    isLoggedIn: !!context.user,
    isAdmin: !!context.user?.isAdmin
  }),
  scopeAuthOptions: {
    unauthorizedError: (_parent, _context, _info, result) => {
      if ('failures' in result.failure) {
        const [failure] = result.failure.failures;

        if ('scope' in failure) {
          if (failure.scope === 'isAdmin') {
            return new ForbiddenError('You must be an admin to perform this action.');
          }
        }
      }

      return new AuthenticationError('You must be logged in to perform this action.');
    }
  },
  relayOptions: {
    clientMutationId: 'optional',
    cursorType: 'String'
  }
});

schemaBuilder.scalarType('Date', {
  serialize: (value: Date) => value.toISOString(),
  parseValue: (value: string) => new Date(value)
});
