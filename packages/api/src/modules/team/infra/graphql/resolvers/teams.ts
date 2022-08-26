import { prismaSeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus } from '~/modules/team/domain';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { IncIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { TeamRef } from '../types/Team';

schemaBuilder.queryField('teams', t =>
  t.field({
    type: [TeamRef],
    args: {
      seasonId: t.arg.globalID()
    },
    resolve: async (_root, args) => {
      const seasonId = args.seasonId
        ? new IncIdentifier(+args.seasonId.id)
        : (await prismaSeasonRepository.findCurrent()).id;

      return prismaTeamRepository.findByStatus(seasonId, ApprovalStatus.ACCEPTED);
    }
  })
);
