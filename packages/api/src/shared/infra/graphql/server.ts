import { initContextCache } from '@pothos/core';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { writeFileSync } from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { ValidationError as YupValidationError } from 'yup';
import config from '~/config';
import { resolveRequestUserService } from '~/modules/users/useCases/ResolveRequestUser';
import { Server } from '~/shared/core';
import { ValidationInputError } from '~/shared/core/Error';
import { schema } from './schema';

class GraphQLServer extends Server {
  public port(): number {
    return 4000;
  }

  public async start(): Promise<void> {
    this.writeSchema();

    const apolloServer = new ApolloServer({
      schema,
      context: async context => {
        return {
          // Adding this will prevent any issues if you server implementation
          // copies or extends the context object before passing it to your resolvers
          ...initContextCache(),
          userAgent: context.req.headers['user-agent'],
          user: await resolveRequestUserService.execute({ bearerToken: context.req.headers.authorization })
        };
      },
      formatError: error => {
        if (error.originalError instanceof YupValidationError) {
          const yupError = error.originalError;
          const isMultiple = yupError.inner.length > 1;

          if (isMultiple) {
            return new ValidationInputError(
              error.originalError.inner.map(inner => ({ field: inner.path, message: inner.message }))
            );
          }

          return new ValidationInputError({ field: yupError.path, message: yupError.message });
        }

        return error;
      },
      plugins: config.isProduction ? [] : [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
    });

    await apolloServer.listen(this.port());
    this.onStart();
  }

  protected writeSchema() {
    const schemaAsString = printSchema(lexicographicSortSchema(schema));

    writeFileSync('./schema.graphql', schemaAsString);
  }
}

export const graphqlServer = new GraphQLServer();
