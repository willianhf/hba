import { User } from '~/modules/users/domain';
import { prismaUserRepository } from '~/modules/users/repos';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const UserRef = schemaBuilder.objectRef<User>('User');
schemaBuilder.node(UserRef, {
  id: {
    resolve: user => user.getId().toValue()
  },
  loadOne: id => prismaUserRepository.getUserById(new UniqueIdentifier(id)),
  isTypeOf: user => user instanceof User,
  fields: t => ({
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
