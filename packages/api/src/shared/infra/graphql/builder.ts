import SchemaBuilder from '@pothos/core';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import { User } from '~/modules/users/domain';
import { ApplicationError } from '~/shared/core/Error';

type SchemaBuilderConfig = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  Context: {
    userAgent: string;
    user: User | null;
  };
  AuthScopes: {
    isLoggedIn: boolean;
    isAdmin: boolean;
  };
};

export const schemaBuilder = new SchemaBuilder<SchemaBuilderConfig>({
  plugins: [ScopeAuthPlugin, SimpleObjectsPlugin],
  authScopes: async context => ({
    isLoggedIn: !!context.user,
    isAdmin: !!context.user?.isAdmin
  }),
  scopeAuthOptions: {
    unauthorizedError: () => 'You are not authorized to access this resource.',
  }
});

schemaBuilder.scalarType('Date', {
  serialize: (value: Date) => value.toISOString(),
  parseValue: (value: string) => new Date(value)
});
