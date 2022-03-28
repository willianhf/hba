import { Position } from '~/modules/player/domain/Position';
import { prismaPositionRepository } from '~/modules/player/repos/impl/Prisma';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const PositionRef = schemaBuilder.objectRef<Position>('Position');
schemaBuilder.node(PositionRef, {
  id: {
    resolve: position => position.getId().toValue()
  },
  loadOne: id => prismaPositionRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: position => position instanceof Position,
  fields: t => ({
    name: t.string({ resolve: position => position.name })
  })
});
