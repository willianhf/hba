import { NBAPlayer } from '~/modules/users/domain/NBAPlayer';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const NBAPlayerRef = schemaBuilder.objectRef<NBAPlayer>('NBAPlayer');
schemaBuilder.objectType(NBAPlayerRef, {
  fields: t => ({
    id: t.id({ resolve: nbaPlayer => nbaPlayer.getId().toValue() }),
    firstName: t.string({ resolve: nbaPlayer => nbaPlayer.firstName }),
    lastName: t.string({ resolve: nbaPlayer => nbaPlayer.lastName })
  })
});
