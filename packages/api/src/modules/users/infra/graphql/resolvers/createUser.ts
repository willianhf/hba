import { createUserService } from '~/modules/users/services/CreateUser';
import { ApplicationError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { CreateUserInput, CreateUserResult } from '../types/User';

schemaBuilder.mutationFields(t => ({
  createUser: t.field({
    type: CreateUserResult,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (_root, args) => {
      try {
        const result = await createUserService.execute(args.input);

        return result.getValue();
      } catch (error) {
        return ApplicationError.fromRaw(error);
      }
    },
  }),
}));
