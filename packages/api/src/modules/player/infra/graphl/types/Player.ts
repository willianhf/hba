import { Player } from '~/modules/player/domain/Player';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const PlayerRef = schemaBuilder.objectRef<Player>('Player');
schemaBuilder.objectType(PlayerRef, {
  fields: t => ({
    id: t.id({ resolve: player => player.getId().toValue() })
  })
});
