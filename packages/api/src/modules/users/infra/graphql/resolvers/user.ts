import { prismaUserRepository } from '~/modules/users/repos';
import { AuthenticationError } from '~/shared/core';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { UserRef } from '../types/User';

schemaBuilder.queryField('user', t =>
  t.field({
    type: UserRef,
    nullable: true,
    resolve: (_root, _args, context) => {
      if (!context.user) {
        return null;
      }

      return prismaUserRepository.findById(context.user.id);
    }
  })
);
