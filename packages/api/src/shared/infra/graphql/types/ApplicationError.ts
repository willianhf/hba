import { schemaBuilder } from '../builder';

export const ApplicationErrorRef = schemaBuilder.simpleObject('ApplicationError', {
  fields: t => ({
    hasError: t.boolean(),
    name: t.string(),
    title: t.string(),
    description: t.string(),
    originalName: t.string({ nullable: true }),
    stackTrace: t.string({ nullable: true }),
  }),
});
