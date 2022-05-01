import { NBAPlayer } from '~/modules/player/domain/NBAPlayer';
import { prismaNBAPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

const IMAGE_SIZES = {
  Small: {
    value: '260x190'
  },
  Large: { value: '1040x760' }
} as const;

const ImageSizeRef = schemaBuilder.enumType('ImageSize', { values: IMAGE_SIZES });

export const NBAPlayerRef = schemaBuilder.objectRef<NBAPlayer>('NBAPlayer');
schemaBuilder.node(NBAPlayerRef, {
  id: {
    resolve: nbaPlayer => nbaPlayer.getId().toValue()
  },
  loadOne: id => prismaNBAPlayerRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: nbaPlayer => nbaPlayer instanceof NBAPlayer,
  fields: t => ({
    firstName: t.string({ resolve: nbaPlayer => nbaPlayer.firstName }),
    lastName: t.string({ resolve: nbaPlayer => nbaPlayer.lastName }),
    imageUrl: t.string({
      args: {
        size: t.arg({ type: ImageSizeRef, defaultValue: IMAGE_SIZES.Large.value })
      },
      resolve: (nbaPlayer, args) => {
        return `https://cdn.nba.com/headshots/nba/latest/${args.size}/${nbaPlayer.getId()}.png`;
      }
    })
  })
});
