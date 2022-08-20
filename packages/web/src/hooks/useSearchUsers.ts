import { useEffect } from 'react';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import { useUsersQuery } from './__generated__/useUsersQuery.graphql';

const SEARCH_USERS_QUERY = graphql`
  query useSearchUsersQuery($search: String!) {
    searchUsers(search: $search) {
      ... on QuerySearchUsersSuccess {
        data {
          id
          username
        }
      }
    }
  }
`;

export function useSearchUsers(search: string) {
  const { data, isLoading, retry } = useQuery<useUsersQuery>(SEARCH_USERS_QUERY, { search }, { skip: true });

  const users = data?.searchUsers?.data ?? [];

  useEffect(() => {
    if (search) {
      retry();
    }
  }, [search]);

  return [users, isLoading, retry] as const;
}
