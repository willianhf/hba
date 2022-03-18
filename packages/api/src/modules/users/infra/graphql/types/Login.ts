import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { ApplicationErrorRef } from '~/shared/infra/graphql/types';

const JWTRef = schemaBuilder.simpleObject('JWT', {
  fields: t => ({
    token: t.string()
  })
});

export const LoginResult = schemaBuilder.unionType('LoginResult', {
  types: [JWTRef, ApplicationErrorRef],
  resolveType: result => {
    if ('hasError' in result) {
      return ApplicationErrorRef;
    }

    return JWTRef;
  }
});

export const LoginInput = schemaBuilder.inputType('LoginInput', {
  fields: t => ({
    username: t.string({ required: true }),
    password: t.string({ required: true })
  })
});
