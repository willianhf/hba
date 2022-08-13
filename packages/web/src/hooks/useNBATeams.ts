import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '@/lib/relay';
import { useNBATeamsQuery, useNBATeamsQuery$data } from './__generated__/useNBATeamsQuery.graphql';
import { Writable } from '@/types/helpers';

const NBA_TEAMS_QUERY = graphql`
  query useNBATeamsQuery {
    nbaTeams {
      conference
      id
      imageUrl
      isAvailable
      name
      nickname
      tricode
    }
  }
`;

const queryReference = loadQuery<useNBATeamsQuery>(relayEnvironment, NBA_TEAMS_QUERY, {});

type NBATeams = Writable<useNBATeamsQuery$data['nbaTeams']>;
export type NBATeam = Writable<NBATeams[number]>;

export function useNBATeams(search?: string): NBATeam[] {
  const data = usePreloadedQuery(NBA_TEAMS_QUERY, queryReference);

  if (!search?.trim()) {
    return data.nbaTeams as NBATeam[];
  }

  return data.nbaTeams.filter(nbaTeam => nbaTeam.name.toLowerCase().includes(search.toLowerCase()));
}
