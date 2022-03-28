import { Season } from '~/modules/season/domain/Season';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { IncIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const SeasonRef = schemaBuilder.objectRef<Season>('Season');

schemaBuilder.node(SeasonRef, {
  id: {
    resolve: season => season.getId().toValue()
  },
  loadOne: id => prismaSeasonRepository.findById(new IncIdentifier(+id)),
  isTypeOf: season => season instanceof Season,
  fields: t => ({
    name: t.string({ resolve: season => season.name })
  })
});
