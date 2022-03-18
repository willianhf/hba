import { loginService } from '~/modules/users/services/Login';
import { ApplicationError } from '~/shared/core/Error';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { LoginInput, LoginResult } from '../types/Login';

schemaBuilder.mutationFields(t => ({
  login: t.field({
    type: LoginResult,
    args: {
      input: t.arg({ type: LoginInput, required: true })
    },
    resolve: async (_root, args, context) => {
      try {
        const jwtToken = await loginService.execute({ ...args.input, userAgent: context.userAgent });
        return jwtToken;
      } catch (error) {
        return ApplicationError.fromRaw(error);
      }
    }
  })
}));

