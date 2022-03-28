import { Player } from '~/modules/player/domain/Player';
import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const PlayerRef = schemaBuilder.objectRef<Player>('Player');
schemaBuilder.node(PlayerRef, {
  id: {
    resolve: player => player.getId().toValue()
  },
  loadOne: id => prismaPlayerRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: player => player instanceof Player,
  fields: () => ({})
});
