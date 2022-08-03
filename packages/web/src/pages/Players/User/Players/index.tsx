import { relayEnvironment } from '@/lib/relay';
import { Authenticated } from '@/ui/components';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { UserPlayersList } from './List';
import { SignUpBanner } from './SignUpBanner';
import { PlayersQuery } from './__generated__/PlayersQuery.graphql';

const USER_PLAYERS_QUERY = graphql`
  query PlayersQuery {
    user {
      ... on AuthenticationError {
        code
      }
      ... on User {
        ...SignUpBanner_user
        ...ListUserPlayers_user
      }
    }
  }
`;

const userPlayersQuery = loadQuery<PlayersQuery>(relayEnvironment, USER_PLAYERS_QUERY, {});

export function UserPlayers() {
  const { user } = usePreloadedQuery(USER_PLAYERS_QUERY, userPlayersQuery);

  return (
    <Authenticated>
      <SignUpBanner userRef={user} />
      <UserPlayersList userRef={user} />
    </Authenticated>
  );
}
