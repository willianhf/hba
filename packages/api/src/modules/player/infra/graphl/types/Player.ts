import { Player } from '~/modules/player/domain/Player';
import {
  prismaIconRepository,
  prismaNBAPlayerRepository,
  prismaPlayerRepository,
  prismaPositionRepository
} from '~/modules/player/repos/impl/Prisma';
import { ApprovalStatus } from '~/modules/player/domain/ApprovalStatus';
import { SeasonRef } from '~/modules/season/infra/graphql/types/Season';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { UserRef } from '~/modules/users/infra/graphql/types/User';
import { prismaUserRepository } from '~/modules/users/repos';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { IconRef } from './Icon';
import { NBAPlayerRef } from './NBAPlayer';
import { PositionRef } from './Position';

export const ApprovalStatusRef = schemaBuilder.enumType(ApprovalStatus, { name: 'ApprovalStatus' });

export const PlayerRef = schemaBuilder.objectRef<Player>('Player');
schemaBuilder.node(PlayerRef, {
  id: {
    resolve: player => player.id.toValue()
  },
  loadOne: id => prismaPlayerRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: player => player instanceof Player,
  fields: t => ({
    nbaPlayer: t.field({
      type: NBAPlayerRef,
      nullable: true,
      resolve: player => prismaNBAPlayerRepository.findById(player.nbaPlayerId)
    }),
    icons: t.field({
      type: [IconRef],
      resolve: player => prismaIconRepository.findPlayerIcons(player.id)
    }),
    position: t.field({
      type: PositionRef,
      nullable: true,
      resolve: player => prismaPositionRepository.findById(player.positionId)
    }),
    user: t.field({
      type: UserRef,
      nullable: true,
      resolve: player => prismaUserRepository.findById(player.userId)
    }),
    season: t.field({
      type: SeasonRef,
      nullable: true,
      resolve: player => prismaSeasonRepository.findById(player.seasonId)
    }),
    status: t.field({
      type: ApprovalStatusRef,
      resolve: player => player.status
    })
  })
});
