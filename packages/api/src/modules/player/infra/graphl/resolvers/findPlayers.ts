import { decodeGlobalID } from '@pothos/plugin-relay';
import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { IncIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { PlayerRef } from '../types/Player';

schemaBuilder.queryField('findPlayers', t =>
  t.field({
    type: [PlayerRef],
    args: {
      seasonId: t.arg({ type: 'String', required: true })
    },
    resolve: async (_root, args) => {
      const seasonId = new IncIdentifier(+decodeGlobalID(args.seasonId).id);
      return prismaPlayerRepository.findAll(seasonId);
    }
  })
);
