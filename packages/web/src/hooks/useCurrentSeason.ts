import { relayEnvironment } from '@/lib/relay';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { useCurrentSeason_currentSeasonQuery, useCurrentSeason_currentSeasonQuery$data } from './__generated__/useCurrentSeason_currentSeasonQuery.graphql';

const CURRENT_SEASON_QUERY = graphql`
  query useCurrentSeason_currentSeasonQuery {
    currentSeason {
      id
      name
    }
  }
`;

const queryRef = loadQuery<useCurrentSeason_currentSeasonQuery>(relayEnvironment, CURRENT_SEASON_QUERY, {});

export type Season = useCurrentSeason_currentSeasonQuery$data['currentSeason'];

export function useCurrentSeason() {
  const data = usePreloadedQuery(CURRENT_SEASON_QUERY, queryRef);

  return data.currentSeason;
}
