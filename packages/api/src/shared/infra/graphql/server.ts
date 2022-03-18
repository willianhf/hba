import { initContextCache } from '@pothos/core';
import { ApolloServer } from 'apollo-server';
import { schema } from './schema';

export class Server {
  public static readonly PORT = 4000;

  static async start() {
    const apolloServer = new ApolloServer({
      schema,
      context: context => ({
        // Adding this will prevent any issues if you server implementation
        // copies or extends the context object before passing it to your resolvers
        ...initContextCache(),
        userAgent: context.req.headers['user-agent']
      })
    });
    await apolloServer.listen(this.PORT);

    console.log(`Server started at http://127.0.0.1:${this.PORT}`);
  }
}
