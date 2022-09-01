import { useAuth } from '@/hooks';
import { Authenticated, Button, Link, List, Text, Verified } from '@/ui/components';
import { graphql, useFragment } from 'react-relay';
import { Player } from './Player';
import { Players_user$key } from './__generated__/Players_user.graphql';

const PLAYERS_FRAGMENT = graphql`
  fragment Players_user on User {
    players(
      first: 2147483647 # max GraphQLInt
    ) @connection(key: "Profile_players") {
      __id
      edges {
        node {
          id
          ...PlayerFragment_player
        }
      }
    }
    canRequestPlayer
  }
`;

interface Props {
  userRef: Players_user$key;
}

export function Players(props: Props) {
  const { players, canRequestPlayer } = useFragment(PLAYERS_FRAGMENT, props.userRef);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Text as="h2" variant="subtitle">
          Suas inscrições
        </Text>
        {canRequestPlayer && (
          <Verified>
            {auth => (
              <Button colorScheme="blue" as={Link} to={`/profile/${auth.user.username}/apply`}>
                Inscrever-se
              </Button>
            )}
          </Verified>
        )}
      </div>
      <List options={players.edges} renderItem={edge => <Player playerRef={edge.node} key={edge?.node.id} />} />
    </div>
  );
}
