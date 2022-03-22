import { Season } from '~/modules/season/domain/Season';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const SeasonRef = schemaBuilder.objectRef<Season>('Season');

schemaBuilder.objectType(SeasonRef, {
  fields: t => ({
    id: t.id({ resolve: season => season.getId().toValue() }),
    name: t.string({ resolve: season => season.name })
  })
});
