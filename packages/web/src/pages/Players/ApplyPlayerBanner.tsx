import { useAuth } from '@/hooks';
import { Authenticated, Button, Card, Link, Text } from '@/ui/components';
import { graphql, useFragment } from 'react-relay';
import { ApplyPlayerBanner_user$key } from './__generated__/ApplyPlayerBanner_user.graphql';

const CAN_REQUEST_PLAYER_FRAGMENT = graphql`
  fragment ApplyPlayerBanner_user on User {
    canRequestPlayer
  }
`;

interface Props {
  userRef: ApplyPlayerBanner_user$key;
}

export function ApplyPlayerBanner(props: Props) {
  const { canRequestPlayer } = useFragment(CAN_REQUEST_PLAYER_FRAGMENT, props.userRef);

  if (!canRequestPlayer) {
    return null;
  }

  return (
    <Authenticated>
      {auth => (
        <Card className="space-y-1 md:space-y-0 md:flex md:items-center md:justify-between mb-2">
          <Text as="p">As inscrições para temporada estão abertas.</Text>
          <div className="md:inline-block">
            <Button colorScheme="blue" as={Link} to={`/profile/${auth.user.username}/apply`}>
              Inscrever-se
            </Button>
          </div>
        </Card>
      )}
    </Authenticated>
  );
}
