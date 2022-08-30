import { Match, MatchId, MatchKind } from '~/modules/match/domain';
import { prismaMatchRepository, prismaMatchSeriesRepository } from '~/modules/match/repos/impl/Prisma';
import { SeasonRef } from '~/modules/season/infra/graphql/types/Season';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { TeamRef } from '~/modules/team/infra/graphql/types/Team';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { MatchSeriesRef } from './MatchSeries';

export const MatchKindRef = schemaBuilder.enumType(MatchKind, { name: 'MatchKind' });

export const MatchRef = schemaBuilder.objectRef<Match>('Match');
schemaBuilder.node(MatchRef, {
  id: {
    resolve: match => match.id.toValue()
  },
  loadOne: id => prismaMatchRepository.findById(new MatchId(id)),
  isTypeOf: match => match instanceof Match,
  fields: t => ({
    season: t.field({
      type: SeasonRef,
      resolve: async match => (await prismaSeasonRepository.findById(match.seasonId))!
    }),
    kind: t.field({
      type: MatchKindRef,
      resolve: match => match.kind
    }),
    homeTeam: t.field({
      type: TeamRef,
      resolve: async match => (await prismaTeamRepository.findById(match.homeTeamId))!
    }),
    awayTeam: t.field({
      type: TeamRef,
      resolve: async match => (await prismaTeamRepository.findById(match.awayTeamId))!
    }),
    scheduledTo: t.field({
      type: 'Date',
      nullable: true,
      resolve: match => match.scheduledTo
    }),
    series: t.field({
      type: MatchSeriesRef,
      nullable: true,
      resolve: match => (match.matchSeriesId ? prismaMatchSeriesRepository.findById(match.matchSeriesId) : null)
    })
  })
});
