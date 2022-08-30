import { relayEnvironment } from '@/lib/relay';
import { graphql, loadQuery, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { MatchRegisterQuery, MatchRegisterQuery$data } from './__generated__/MatchRegisterQuery.graphql';

const MATCH_REGISTER_QUERY = graphql`
  query MatchRegisterQuery {
    matchKinds
    teams {
      id
      nbaTeam {
        name
        imageUrl
      }
    }
  }
`;

export const matchRegisterLoader: LoaderFunction = () => {
  return loadQuery(relayEnvironment, MATCH_REGISTER_QUERY, {});
};

export function useMatchRegisterQuery() {
  const queryRef = useLoaderData() as PreloadedQuery<MatchRegisterQuery>;
  return usePreloadedQuery(MATCH_REGISTER_QUERY, queryRef);
}

export type Teams = MatchRegisterQuery$data['teams'];
export { type MatchKind } from './__generated__/MatchRegisterQuery.graphql';
