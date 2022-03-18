import '~/modules/users/infra/graphql/resolvers';
import { schemaBuilder } from './builder';

schemaBuilder.mutationType({});
schemaBuilder.queryType({
  fields: t => ({
    hello: t.string({
      authScopes: {
        isLoggedIn: true
      },
      resolve: () => {
        return 'Hello world!';
      }
    })
  })
});

export const schema = schemaBuilder.toSchema({});
