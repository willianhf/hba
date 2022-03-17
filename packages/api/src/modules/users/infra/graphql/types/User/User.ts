import { User } from '~/modules/users/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const UserRef = schemaBuilder.objectRef<User>('User');
schemaBuilder.objectType(UserRef, {
  fields: t => ({
    id: t.id({ resolve: user => user.getId().toValue() }),
    username: t.string({ resolve: user => user.username.value }),
    password: t.string({ resolve: user => user.password.value }),
    isVerified: t.boolean({ resolve: user => user.isVerified }),
    isAdmin: t.boolean({ resolve: user => user.isAdmin }),
    createdAt: t.field({
      type: 'Date',
      resolve: user => user.createdAt,
      nullable: true
    })
  })
});
