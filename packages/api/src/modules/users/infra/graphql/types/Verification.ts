import { Verification, VerificationCode } from '~/modules/users/domain/Verification';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from './User';

export const VerificationRef = schemaBuilder.objectRef<Verification>('Verification');

const VerificationCodeRef = schemaBuilder.objectRef<VerificationCode>('VerificationCode').implement({
  fields: t => ({
    value: t.string({ resolve: verificationCode => verificationCode.value }),
    expiresAt: t.field({ type: 'Date', resolve: verificationCode => verificationCode.expiresAt })
  })
});

schemaBuilder.node(VerificationRef, {
  id: {
    resolve: verification => verification.id.toValue()
  },
  isTypeOf: verification => verification instanceof Verification,
  fields: t => ({
    code: t.field({ type: VerificationCodeRef, resolve: verification => verification.code }),
    createdAt: t.field({ type: 'Date', resolve: verification => verification.createdAt }),
    updatedAt: t.field({ type: 'Date', resolve: verification => verification.updatedAt }),
    user: t.field({ type: UserRef, resolve: verification => verification.user })
  })
});
