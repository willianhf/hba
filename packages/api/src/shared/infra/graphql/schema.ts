import '~/modules/season/infra/graphql/resolvers';
import '~/modules/player/infra/graphl/resolvers';
import '~/modules/team/infra/graphql/resolvers';
import '~/modules/match/infra/graphql/resolvers';
import './types/Error';
import { schemaBuilder } from './builder';

schemaBuilder.mutationType({});
schemaBuilder.queryType({});

export const schema = schemaBuilder.toSchema({});
