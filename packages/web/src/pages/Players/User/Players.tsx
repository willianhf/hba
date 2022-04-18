import { relayEnvironment } from '@/lib/relay';
import { Text } from '@/ui/components';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { Player } from './Player';
import { UserPlayerRegister } from './Register';
import { Players_canRequestPlayerQuery } from './__generated__/Players_canRequestPlayerQuery.graphql';
import { Players_findUserPlayersBySeasonQuery } from './__generated__/Players_findUserPlayersBySeasonQuery.graphql';

const FIND_USER_PLAYERS_BY_SEASON_QUERY = graphql`
  query Players_findUserPlayersBySeasonQuery {
    findUserPlayersBySeason {
      ...PlayerFragment_player
    }
  }
`;

const findUserPlayerQueryRef = loadQuery<Players_findUserPlayersBySeasonQuery>(
  relayEnvironment,
  FIND_USER_PLAYERS_BY_SEASON_QUERY,
  {}
);

const CAN_REQUEST_PLAYER_QUERY = graphql`
  query Players_canRequestPlayerQuery {
    canRequestPlayer
  }
`;

const canRequestPlayerQueryRef = loadQuery<Players_canRequestPlayerQuery>(
  relayEnvironment,
  CAN_REQUEST_PLAYER_QUERY,
  {}
);

export function PlayersUser() {
  const data = usePreloadedQuery(FIND_USER_PLAYERS_BY_SEASON_QUERY, findUserPlayerQueryRef);
  const canRequestPlayerData = usePreloadedQuery(CAN_REQUEST_PLAYER_QUERY, canRequestPlayerQueryRef);

  const hasSentPlayers = data.findUserPlayersBySeason.length > 0;

  return (
    <>
      {hasSentPlayers && (
        <div>
          <Text as="h2" variant="subtitle" className="mb-1">
            Inscrições enviadas
          </Text>
          <div className="space-y-2">
            {data.findUserPlayersBySeason.map(player => (
              <Player player={player} />
            ))}
          </div>
        </div>
      )}
      {canRequestPlayerData.canRequestPlayer && <UserPlayerRegister />}
    </>
  );
}
