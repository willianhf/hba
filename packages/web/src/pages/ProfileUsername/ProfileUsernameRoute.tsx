import { Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import { useParams } from 'react-router-dom';
import { ProfileUsername } from './ProfileUsername';
import { PROFILE_USERNAME_QUERY } from './ProfileUsernameQuery';
import { ProfileUsernameQuery } from './__generated__/ProfileUsernameQuery.graphql';

export function ProfileUsernameRoute() {
  const params = useParams();
  const [queryRef, loadQuery] = useQueryLoader<ProfileUsernameQuery>(PROFILE_USERNAME_QUERY);

  useEffect(() => {
    loadQuery({ username: params.username! });
  }, [params.username]);

  return <Suspense fallback={null}>{queryRef && <ProfileUsername profileQueryRef={queryRef} />}</Suspense>;
}
