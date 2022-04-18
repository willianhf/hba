import { useCurrentSeason } from '@/hooks';
import { Card, Text } from '@/ui/components';
import { graphql, useLazyLoadQuery } from 'react-relay';
import {
  ListPlayers_findAllQuery,
  ListPlayers_findAllQuery$data
} from './__generated__/ListPlayers_findAllQuery.graphql';
import { groupBy } from '@/utils/array';
import { Writable } from '@/types/helpers';
import { Fragment } from 'react';

const PLAYERS_QUERY = graphql`
  query ListPlayers_findAllQuery($seasonId: String!) {
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
  const season = useCurrentSeason();
  const playersData = useLazyLoadQuery<ListPlayers_findAllQuery>(PLAYERS_QUERY, {
    seasonId: season.id
  });

  const playersByPosition = groupBy(playersData.findPlayers.concat(), player => player.position?.name ?? '');

  return (
    <div className='space-y-4'>
      {Object.entries(playersByPosition).map(([position, players]) => (
        <div key={position}>
          <Text variant="subtitle" className="block mb-1">{position}</Text>
          {players.map(player => (
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
          ))}
        </div>
      ))}
    </div>
  );
}
