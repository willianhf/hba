import { relayEnvironment } from '@/lib/relay';
import { Text } from '@/ui/components';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { useParams } from 'react-router';
import { Players } from './Players';
import { ProfileQuery } from './__generated__/ProfileQuery.graphql';

const PROFILE_QUERY = graphql`
  query ProfileQuery {
    user {
      ... on User {
        ...Players_user
      }
    }
  }
`;
const profileQuery = loadQuery<ProfileQuery>(relayEnvironment, PROFILE_QUERY, {});

export function Profile() {
  const { user } = usePreloadedQuery(PROFILE_QUERY, profileQuery);
  const { username } = useParams();

  return (
    <div className="space-y-1">
      <Text variant="title">Perfil de {username}</Text>
      <Players userRef={user} />
    </div>
  );
}
