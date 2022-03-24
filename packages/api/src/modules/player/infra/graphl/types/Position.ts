import { Position } from '~/modules/player/domain/Position';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const PositionRef = schemaBuilder.objectRef<Position>('Position');
schemaBuilder.objectType(PositionRef, {
  fields: t => ({
    id: t.id({ resolve: position => position.getId().toValue() }),
    name: t.string({ resolve: position => position.name })
  })
});
