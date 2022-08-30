import { MatchSeries, MatchSeriesId } from '~/modules/match/domain';
import { prismaMatchSeriesRepository } from '~/modules/match/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const MatchSeriesRef = schemaBuilder.objectRef<MatchSeries>('MatchSeries');
schemaBuilder.node(MatchSeriesRef, {
  id: {
    resolve: matchSeries => matchSeries.id.toValue()
  },
  loadOne: id => prismaMatchSeriesRepository.findById(new MatchSeriesId(id)),
  isTypeOf: matchSeries => matchSeries instanceof MatchSeries,
  fields: t => ({
    name: t.string({ resolve: matchSeries => matchSeries.name })
  })
});
