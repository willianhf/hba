import { Text } from '@/ui/components';
import { graphql, useFragment } from 'react-relay';
import { Player } from '../Player';
import { ListUserPlayers_user$key } from './__generated__/ListUserPlayers_user.graphql';

const USER_PLAYERS_LIST_FRAGMENT = graphql`
  fragment ListUserPlayers_user on User {
    players(
      first: 2147483647 # max GraphQLInt
    ) @connection(key: "Players_players") {
      __id
      edges {
        node {
          id
          ...PlayerFragment_player
        }
      }
    }
  }
`;

interface Props {
  userRef: ListUserPlayers_user$key;
}

export function UserPlayersList(props: Props) {
  const { players } = useFragment(USER_PLAYERS_LIST_FRAGMENT, props.userRef);

  const hasSentPlayers = players.edges.length > 0;

  return (
    <>
      {hasSentPlayers && (
        <div>
          <Text as="h1" variant="title" className="mb-2">
            Suas inscrições
          </Text>
          <div className="space-y-2">
            {players.edges.map(edge => (
              <Player playerRef={edge.node} key={edge?.node.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

