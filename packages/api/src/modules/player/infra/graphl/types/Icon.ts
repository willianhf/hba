import { Icon } from '~/modules/player/domain/Icon';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const IconRef = schemaBuilder.objectRef<Icon>('Icon');
schemaBuilder.objectType(IconRef, {
  fields: t => ({
    id: t.id({ resolve: icon => icon.getId().toValue() }),
    name: t.string({ resolve: icon => icon.name })
  })
});
