import { Card, Text, Tooltip } from '@/ui/components';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/outline';
import { graphql } from 'react-relay';
import { useFragment } from 'relay-hooks';
import { match } from 'ts-pattern';
import { PlayerFragment_player$key } from './__generated__/PlayerFragment_player.graphql';

const PLAYER_FRAGMENT = graphql`
  fragment PlayerFragment_player on Player {
    status
    nbaPlayer {
      firstName
      lastName
    }
    position {
      name
    }
    icons {
      name
    }
  }
`;

interface Props {
  playerRef: PlayerFragment_player$key;
}

export function Player(props: Props) {
  const player = useFragment(PLAYER_FRAGMENT, props.playerRef);

  return (
    <Card className="inline-block w-full">
      <div className="flex justify-between items-center">
        <Text as="div" variant="subtitle">
          {player.nbaPlayer?.firstName} {player.nbaPlayer?.lastName}
        </Text>
        {match(player.status)
          .with('ACCEPTED', () => (
            <Tooltip content="Inscrição aprovada" side="top" sideOffSet={4}>
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </Tooltip>
          ))
          .with('DENIED', () => (
            <Tooltip content="Inscrição recusada" side="top" sideOffSet={4}>
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </Tooltip>
          ))
          .with('IDLE', () => (
            <Tooltip content="Inscrição em análise" side="top" sideOffSet={4}>
              <ClockIcon className="h-6 w-6 text-orange-300" />
            </Tooltip>
          ))
          .run()}
      </div>
      <Text as="div" color="secondary">
        {player.position?.name}
      </Text>
      <Text as="div" color="secondary">
        {player.icons?.map(icon => icon.name).join(', ')}
      </Text>
    </Card>
  );
}
