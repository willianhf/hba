import { useCurrentSeason } from '@/hooks';
import { Card, List, Text } from '@/ui/components';
import { groupBy } from '@/utils/array';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { PlayersList_findPlayersQuery } from './__generated__/PlayersList_findPlayersQuery.graphql';

const PLAYERS_QUERY = graphql`
  query PlayersList_findPlayersQuery($seasonId: String!) {
    findPlayers(seasonId: $seasonId) {
      id
      icons {
        name
      }
      nbaPlayer {
        firstName
        lastName
        imageUrl
      }
      position {
        id
        name
      }
      user {
        username
      }
    }
  }
`;

export function PlayersList() {
  const currentSeason = useCurrentSeason();
  const { findPlayers } = useLazyLoadQuery<PlayersList_findPlayersQuery>(PLAYERS_QUERY, {
    seasonId: currentSeason.id
  });

  const hasSubscribedPlayers = findPlayers.length > 0;
  const playersByPosition = groupBy(findPlayers.concat(), player => player.position?.name ?? '');

  return (
    <div>
      <Text as="h1" variant="title" className="mb-2">
        Jogadores inscritos
      </Text>
      {hasSubscribedPlayers ? (
        <div className="space-y-4">
          {Object.entries(playersByPosition).map(([position, players]) => (
            <div key={position}>
              <Text variant="subtitle" className="block mb-2">
                {position}
              </Text>
              <List options={players} renderItem={(player) => (
                <Card key={player.id} className="flex items-center w-full">
                  <div>
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 relative z-0">
                      <img src={player.nbaPlayer?.imageUrl} className="h-24 object-cover absolute bottom-0" />
                    </div>
                  </div>
                  <div className="px-4">
                    <Text variant="subtitle" className="block">
                      {player.user?.username}
                    </Text>
                    <Text className="block">
                      {player.nbaPlayer?.firstName} {player.nbaPlayer?.lastName}
                    </Text>
                    <Text className="block">{player.icons?.map(icon => icon.name).join(', ')}</Text>
                  </div>
                </Card>
              )} />
            </div>
          ))}
        </div>
      ) : (
        <Text as="p">Nenhum jogador aprovado até o momento.</Text>
      )}
    </div>
  );
}
