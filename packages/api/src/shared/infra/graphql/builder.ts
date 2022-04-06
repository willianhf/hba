import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import RelayPlugin from '@pothos/plugin-relay';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import { User } from '~/modules/users/domain';
import { AuthenticationError, ForbiddenError } from '~/shared/core/Error';

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
  plugins: [SimpleObjectsPlugin, RelayPlugin, ErrorsPlugin, ScopeAuthPlugin],
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
            return new ForbiddenError();
          }
        }
      }

      return new AuthenticationError();
    }
  },
  relayOptions: {
    clientMutationId: 'optional',
    cursorType: 'String'
  },
  errorOptions: {
    directResult: true
  }
});

schemaBuilder.scalarType('Date', {
  serialize: (value: Date) => value.toISOString(),
  parseValue: (value: string) => new Date(value)
});
