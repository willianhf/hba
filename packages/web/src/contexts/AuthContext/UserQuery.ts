import { relayEnvironment } from '@/lib/relay';
import { graphql, loadQuery } from 'react-relay';
import { UserQuery } from './__generated__/UserQuery.graphql';

export const USER_QUERY = graphql`
  query UserQuery {
    user {
      ... on User {
        id
        username
        canApplyTeam
        canRequestPlayer
        isAdmin
        isVerified
      }
    }
  }
`;

export const userQueryRef = loadQuery<UserQuery>(relayEnvironment, USER_QUERY, {});

export function refetchUserQuery() {
  loadQuery<UserQuery>(relayEnvironment, USER_QUERY, {}, { fetchPolicy: 'network-only' });
}
