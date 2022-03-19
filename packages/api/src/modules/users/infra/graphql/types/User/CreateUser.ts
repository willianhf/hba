import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from './User';

export const CreateUserResult = UserRef;

export const CreateUserInput = schemaBuilder.inputType('CreateUserInput', {
  fields: t => ({
    username: t.string({ required: true }),
    password: t.string({ required: true })
  })
});
