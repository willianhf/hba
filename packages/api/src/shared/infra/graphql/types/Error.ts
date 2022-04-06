import { ApplicationError, AuthenticationError, ForbiddenError, ValidationInputError } from '~/shared/core/Error';
import { schemaBuilder } from '../builder';

const ErrorInterface = schemaBuilder.interfaceRef<ApplicationError>('BaseError').implement({
  fields: t => ({
    name: t.exposeString('name'),
    message: t.exposeString('message'),
    code: t.string({ resolve: error => error.extensions.code })
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

schemaBuilder.objectType(ValidationInputError, {
  name: 'ValidationInputError',
  interfaces: [ErrorInterface],
  fields: t => ({
    fields: t.field({
      type: [ErrorField],
      resolve: error => error.extensions.fields
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
