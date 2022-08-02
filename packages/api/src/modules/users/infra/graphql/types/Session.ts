import { Session } from '~/modules/users/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from './User';

export const SessionRef = schemaBuilder.objectRef<Session>('Session');

schemaBuilder.node(SessionRef, {
  id: {
    resolve: session => session.id.toValue()
  },
  isTypeOf: session => session instanceof Session,
  fields: t => ({
    user: t.field({ type: UserRef, resolve: verification => verification.user }),
    userAgent: t.string({ resolve: verification => verification.userAgent }),
    createdAt: t.field({ type: 'Date', resolve: verification => verification.createdAt })
  })
});
