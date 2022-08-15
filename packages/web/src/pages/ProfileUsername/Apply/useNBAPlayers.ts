import { Writable } from '@/types/helpers';
import { useEffect } from 'react';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import {
  useNBAPlayers_nbaPlayersQuery,
  useNBAPlayers_nbaPlayersQuery$data
} from './__generated__/useNBAPlayers_nbaPlayersQuery.graphql';

const FIND_NBA_PLAYERS_QUERY = graphql`
  query useNBAPlayers_nbaPlayersQuery($search: String!) {
    nbaPlayers(search: $search) {
      id
      firstName
      lastName
      imageUrl(size: Small)
    }
  }
`;

type NBAPlayers = Writable<useNBAPlayers_nbaPlayersQuery$data['nbaPlayers']>;

export type NBAPlayer = Writable<NBAPlayers[number]>;

export function useNBAPlayers(search: string) {
  const { data, isLoading, retry } = useQuery<useNBAPlayers_nbaPlayersQuery>(
    FIND_NBA_PLAYERS_QUERY,
    { search },
    { skip: true }
  );

  const nbaPlayers = (data?.nbaPlayers ?? []) as NBAPlayers;

  useEffect(() => {
    if (search) {
      retry();
    }
  }, [search]);

  return [nbaPlayers, isLoading, retry] as const;
}
