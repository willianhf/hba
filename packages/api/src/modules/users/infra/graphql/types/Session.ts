import { Session } from '~/modules/users/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from './User';

export const SessionRef = schemaBuilder.objectRef<Session>('Session');

schemaBuilder.objectType(SessionRef, {
  isTypeOf: session => session instanceof Session,
  fields: t => ({
    id: t.string({ resolve: session => session.id.toValue() }),
    user: t.field({ type: UserRef, resolve: session => session.user }),
    userAgent: t.string({ resolve: session => session.userAgent }),
    createdAt: t.field({ type: 'Date', resolve: session => session.createdAt })
  })
});
