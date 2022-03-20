import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const ConfirmUserVerificationResult = schemaBuilder.simpleObject('ConfirmUserVerificationResult', {
  fields: t => ({
    _: t.boolean()
  })
});
