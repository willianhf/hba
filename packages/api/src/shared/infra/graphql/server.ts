import { initContextCache } from '@pothos/core';
import { ApolloServer } from 'apollo-server';
import { writeFileSync } from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { ValidationError as YupValidationError } from 'yup';
import { resolveRequestUserService } from '~/modules/users/services/ResolveRequestUser';
import { ValidationInputError } from '~/shared/core/Error';
import { schema } from './schema';

export class Server {
  public static readonly PORT = 4000;

  public static async start() {
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
      }
    });
    await apolloServer.listen(this.PORT);

    console.log(`Server started at http://127.0.0.1:${this.PORT}`);
  }

  protected static writeSchema() {
    const schemaAsString = printSchema(lexicographicSortSchema(schema));

    writeFileSync('./schema.graphql', schemaAsString);
  }
}
