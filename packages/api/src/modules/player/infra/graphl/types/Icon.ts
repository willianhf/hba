import { Icon } from '~/modules/player/domain/Icon';
import { prismaIconRepository } from '~/modules/player/repos/impl/Prisma';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const IconRef = schemaBuilder.objectRef<Icon>('Icon');
schemaBuilder.node(IconRef, {
  id: {
    resolve: icon => icon.getId().toValue()
  },
  loadOne: id => prismaIconRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: icon => icon instanceof Icon,
  fields: t => ({
    name: t.string({ resolve: icon => icon.name })
  })
});
