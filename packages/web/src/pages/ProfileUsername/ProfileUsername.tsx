import { useAuth } from '@/hooks';
import { Text } from '@/ui/components';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Players } from './Players';
import { PROFILE_USERNAME_QUERY } from './ProfileUsernameQuery';
import { ProfileUsernameQuery } from './__generated__/ProfileUsernameQuery.graphql';

interface Props {
  profileQueryRef: PreloadedQuery<ProfileUsernameQuery>;
}

export function ProfileUsername(props: Props) {
  const { user, findUser } = usePreloadedQuery(PROFILE_USERNAME_QUERY, props.profileQueryRef);
  const auth = useAuth();

  if (!findUser) {
    return (
      <Text as="h1" variant="title" className="text-center">
        Perfil não encontrado
      </Text>
    );
  }

  const isOwnProfile = auth.user?.id === findUser.id;

  return (
    <div className="space-y-1">
      <Text variant="title" as="h1">
        Perfil de {findUser.username}
      </Text>
      {isOwnProfile && <Players userRef={user} />}
    </div>
  );
}
