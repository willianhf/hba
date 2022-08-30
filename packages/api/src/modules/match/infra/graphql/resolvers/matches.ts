import { prismaMatchRepository } from '~/modules/match/repos/impl/Prisma';
import { SeasonId } from '~/modules/season/domain';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { MatchRef } from '../types';

schemaBuilder.queryField('matches', t =>
  t.field({
    type: [MatchRef],
    args: {
      seasonId: t.arg.globalID()
    },
    resolve: async (_root, args) => {
      const seasonId = args.seasonId
        ? new SeasonId(+args.seasonId.id)
        : (await prismaSeasonRepository.findCurrent()).id;

      return prismaMatchRepository.findBySeason(seasonId);
    }
  })
);
