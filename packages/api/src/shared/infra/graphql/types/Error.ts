import { ErrorFieldOptions } from '@pothos/plugin-errors';
import {
  ApplicationError,
  AuthenticationError,
  ForbiddenError,
  ValidationError,
  ValidationInputError
} from '~/shared/core';
import { schemaBuilder } from '../builder';

export const ErrorInterface = schemaBuilder.interfaceRef<ApplicationError>('BaseError').implement({
  fields: t => ({
    name: t.exposeString('name'),
    message: t.exposeString('message'),
    code: t.string({ resolve: error => error.code })
  })
});

schemaBuilder.objectType(ApplicationError, {
  name: 'ApplicationError',
  interfaces: [ErrorInterface]
});

const ErrorField = schemaBuilder.simpleObject('ErrorField', {
  fields: t => ({
    field: t.string({ nullable: true }),
    message: t.string()
  })
});

schemaBuilder.objectType(ValidationError, {
  name: 'ValidationError',
  interfaces: [ErrorInterface]
});

schemaBuilder.objectType(ValidationInputError, {
  name: 'ValidationInputError',
  interfaces: [ErrorInterface],
  fields: t => ({
    fields: t.field({
      type: [ErrorField],
      resolve: error => error.extensions.fields as any
    })
  })
});

schemaBuilder.objectType(AuthenticationError, {
  name: 'AuthenticationError',
  interfaces: [ErrorInterface]
});

schemaBuilder.objectType(ForbiddenError, {
  name: 'ForbiddenError',
  interfaces: [ErrorInterface]
});
