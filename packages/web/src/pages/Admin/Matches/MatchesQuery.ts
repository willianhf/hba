import { relayEnvironment } from '@/lib/relay';
import { graphql, loadQuery, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { MatchesQuery } from './__generated__/MatchesQuery.graphql';

// TODO: Fetch both teams season record to display

const MATCHES_QUERY = graphql`
  query MatchesQuery {
    matches {
      id
      kind
      scheduledTo
      homeTeam {
        nbaTeam {
          nickname
          imageUrl
        }
      }
      awayTeam {
        nbaTeam {
          nickname
          imageUrl
        }
      }
    }
  }
`;

export const matchesLoader: LoaderFunction = () => {
  return loadQuery(relayEnvironment, MATCHES_QUERY, {});
};

export function useMatchesQuery() {
  const queryRef = useLoaderData() as PreloadedQuery<MatchesQuery>;

  return usePreloadedQuery(MATCHES_QUERY, queryRef);
}
