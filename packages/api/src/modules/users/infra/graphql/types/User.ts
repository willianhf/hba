import { decodeGlobalID, resolveArrayConnection } from '@pothos/plugin-relay';
import { PlayerRef } from '~/modules/player/infra/graphl/types/Player';
import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { User } from '~/modules/users/domain';
import { prismaUserRepository } from '~/modules/users/repos';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const UserRef = schemaBuilder.objectRef<User>('User');

schemaBuilder.node(UserRef, {
  id: {
    resolve: user => user.getId().toValue()
  },
  loadOne: id => prismaUserRepository.getUserById(new UniqueIdentifier(id)),
  isTypeOf: user => user instanceof User,
  fields: t => ({
    username: t.string({ resolve: user => user.username.value }),
    password: t.string({ resolve: user => user.password.value }),
    isVerified: t.boolean({ resolve: user => user.isVerified }),
    isAdmin: t.boolean({ resolve: user => user.isAdmin }),
    createdAt: t.field({
      type: 'Date',
      resolve: user => user.createdAt,
      nullable: true
    }),
    players: t.connection({
      type: PlayerRef,
      resolve: async (user, args) => {
        const season = await prismaSeasonRepository.findCurrent();
        const players = await prismaPlayerRepository.findByUserAndSeason(user.getId(), season.getId());

        return resolveArrayConnection({ args }, players);
      }
    }),
    canRequestPlayer: t.boolean({
      resolve: async (user) => {
        const season = await prismaSeasonRepository.findCurrent();
        return prismaPlayerRepository.canRequestPlayer(user.getId(), season.getId());
      }
    })
  })
});
