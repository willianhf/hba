import '~/modules/users/infra/graphql/resolvers';
import '~/modules/season/infra/graphql/resolvers';
import '~/modules/player/infra/graphl/resolvers';
import { schemaBuilder } from './builder';

schemaBuilder.mutationType({});
schemaBuilder.queryType({});

export const schema = schemaBuilder.toSchema({});
