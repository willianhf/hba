import { fetchUserUseCase } from '~/modules/users/useCases/FetchUser';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

schemaBuilder.queryField('findUser', t =>
  t.field({
    type: UserRef,
    nullable: true,
    errors: {
      types: []
    },
    args: {
      username: t.arg({ type: 'String', required: true })
    },
    resolve: async (_root, args) => {
      return fetchUserUseCase.execute(args);
    }
  })
);
