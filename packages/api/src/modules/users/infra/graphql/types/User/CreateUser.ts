import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { ApplicationErrorRef } from '~/shared/infra/graphql/types';
import { UserRef } from './User';

export const CreateUserResult = schemaBuilder.unionType('CreateUserResult', {
  types: [UserRef, ApplicationErrorRef],
  resolveType: result => {
    if ('hasError' in result) {
      return ApplicationErrorRef;
    }

    return UserRef;
  }
});

export const CreateUserInput = schemaBuilder.inputType('CreateUserInput', {
  fields: t => ({
    username: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});
