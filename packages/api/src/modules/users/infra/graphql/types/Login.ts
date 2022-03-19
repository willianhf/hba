import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const LoginResult = schemaBuilder.simpleObject('LoginResult', {
  fields: t => ({
    token: t.string()
  })
});

export const LoginInput = schemaBuilder.inputType('LoginInput', {
  fields: t => ({
    username: t.string({ required: true }),
    password: t.string({ required: true })
  })
});
