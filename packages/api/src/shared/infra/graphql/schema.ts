import { schemaBuilder } from './builder';
import '~/modules/users/infra/graphql/resolvers';

schemaBuilder.mutationType({});
schemaBuilder.queryType({
  fields: t => ({
    hello: t.string({ resolve: () => 'Hello world!' }),
  }),
});

export const schema = schemaBuilder.toSchema({});
