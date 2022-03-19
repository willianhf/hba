import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const CreateUserVerificationResult = schemaBuilder.simpleObject('CreateUserVerificationResult', {
  fields: t => ({
    verificationCode: t.string()
  })
});