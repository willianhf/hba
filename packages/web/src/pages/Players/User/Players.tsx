import { relayEnvironment } from '@/lib/relay';
import { Button, Card, Link, Text } from '@/ui/components';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { UserPlayersList } from './PlayersList';
import { PlayersQuery } from './__generated__/PlayersQuery.graphql';

const USER_PLAYERS_QUERY = graphql`
  query PlayersQuery {
    user {
      canRequestPlayer
      ...PlayersList_user
    }
  }
`;

const userQueryRef = loadQuery<PlayersQuery>(relayEnvironment, USER_PLAYERS_QUERY, {});

export function UserPlayers() {
  const { user } = usePreloadedQuery(USER_PLAYERS_QUERY, userQueryRef);

  return (
    <>
      {user.canRequestPlayer && (
        <Card className="space-y-1 md:space-y-0 md:flex md:items-center md:justify-between mb-2">
          <Text as="p">As inscrições para temporada estão abertas.</Text>
          <div className="md:inline-block">
            <Button colorScheme="red" as={Link} href="register">
              Inscrever-se
            </Button>
          </div>
        </Card>
      )}
      <UserPlayersList userRef={user} />
    </>
  );
}
