import { initContextCache } from '@pothos/core';
import { writeFileSync } from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { Server } from '~/shared/core';
import { schema } from './schema';

class GraphQLServer extends Server {
  protected port(): number {
    return 4000;
  }

  public async start(): Promise<void> {
    this.writeSchema();

    const yoga = createYoga({
      schema,
      context: async context => {
        return {
          // Adding this will prevent any issues if you server implementation
          // copies or extends the context object before passing it to your resolvers
          ...initContextCache(),
          userAgent: context.request.headers.get('user-agent'),
          // user: await resolveRequestUserService.execute({
          //   bearerToken: context.request.headers.get('authorization') ?? ''
          // })
        };
      }
    });

    // formatError: error => {
    //   if (error.originalError instanceof YupValidationError) {
    //     const yupError = error.originalError;
    //     const isMultiple = yupError.inner.length > 1;

    //     if (isMultiple) {
    //       return new ValidationInputError(
    //         error.originalError.inner.map(inner => ({ field: inner.path, message: inner.message }))
    //       );
    //     }

    //     return new ValidationInputError({ field: yupError.path, message: yupError.message });
    //   }

    //   return error;
    // },
    
    const server = createServer(yoga);
    server.listen(this.port());

    this.onStart();
  }

  protected writeSchema() {
    const schemaAsString = printSchema(lexicographicSortSchema(schema));

    writeFileSync('./schema.graphql', schemaAsString);
  }
}

export const graphqlServer = new GraphQLServer();
