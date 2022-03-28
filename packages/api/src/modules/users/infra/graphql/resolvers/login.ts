import { loginService } from '~/modules/users/services/Login';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

schemaBuilder.relayMutationField(
  'login',
  {
    inputFields: t => ({
      username: t.string({ required: true }),
      password: t.string({ required: true })
    })
  },
  {
    resolve: async (_root, args, context) => {
      const jwtToken = await loginService.execute({ ...args.input, userAgent: context.userAgent });
      return jwtToken;
    }
  },
  { outputFields: t => ({ token: t.string({ resolve: jwtToken => jwtToken }) }) }
);
