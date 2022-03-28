import { createUserService } from '~/modules/users/services/CreateUser';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

schemaBuilder.relayMutationField(
  'createUser',
  {
    inputFields: t => ({
      username: t.string({ required: true }),
      password: t.string({ required: true })
    })
  },
  {
    resolve: async (_root, args) => {
      const user = await createUserService.execute(args.input);
      return user;
    }
  },
  {
    outputFields: t => ({
      user: t.field({ type: UserRef, resolve: user => user })
    })
  }
);
