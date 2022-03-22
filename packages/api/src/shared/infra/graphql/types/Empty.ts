import { schemaBuilder } from '../builder';

export const EmptyRef = schemaBuilder.simpleObject('Empty', {
  fields: t => ({
    _: t.boolean()
  })
});
