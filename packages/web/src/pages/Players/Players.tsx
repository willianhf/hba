import { relayEnvironment } from '@/lib/relay';
import { Authenticated } from '@/ui/components';
import { Suspense } from 'react';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { ApplyPlayerBanner } from './ApplyPlayerBanner';
import { PlayersList } from './PlayersList';
import { PlayersQuery } from './__generated__/PlayersQuery.graphql';

const APPLY_PLAYER_BANNER_QUERY = graphql`
  query PlayersQuery {
    user {
      ... on User {
        ...ApplyPlayerBanner_user
      }
    }
  }
`;
const userPlayersQuery = loadQuery<PlayersQuery>(relayEnvironment, APPLY_PLAYER_BANNER_QUERY, {});

export function Players() {
  const { user } = usePreloadedQuery(APPLY_PLAYER_BANNER_QUERY, userPlayersQuery);

  return (
    <div className="space-y-2">
      <Authenticated>
        <ApplyPlayerBanner userRef={user} />
      </Authenticated>
      <Suspense fallback={null}>
        <PlayersList />
      </Suspense>
    </div>
  );
}
