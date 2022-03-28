import { NBAPlayer } from '~/modules/player/domain/NBAPlayer';
import { prismaNBAPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const NBAPlayerRef = schemaBuilder.objectRef<NBAPlayer>('NBAPlayer');
schemaBuilder.node(NBAPlayerRef, {
  id: {
    resolve: nbaPlayer => nbaPlayer.getId().toValue()
  },
  loadOne: id => prismaNBAPlayerRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: nbaPlayer => nbaPlayer instanceof NBAPlayer,
  fields: t => ({
    firstName: t.string({ resolve: nbaPlayer => nbaPlayer.firstName }),
    lastName: t.string({ resolve: nbaPlayer => nbaPlayer.lastName })
  })
});
