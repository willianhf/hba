import { ApolloServer } from 'apollo-server';
import { schema } from './schema';

export class Server {
  public static readonly PORT = 4000;

  static async start() {
    const apolloServer = new ApolloServer({ schema });
    await apolloServer.listen(this.PORT);

    console.log(`Server started at http://127.0.0.1:${this.PORT}`);
  }
}
