import { relayEnvironment } from '@/lib/relay';
import { Writable } from '@/types/helpers';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import {
    usePositions_positionsQuery,
    usePositions_positionsQuery$data
} from './__generated__/usePositions_positionsQuery.graphql';

type Positions = Writable<usePositions_positionsQuery$data['positions']>;
export type Position = Writable<Positions[number]>;

const POSITIONS_QUERY = graphql`
  query usePositions_positionsQuery {
    positions {
      id
      name
    }
  }
`;

const queryRef = loadQuery<usePositions_positionsQuery>(relayEnvironment, POSITIONS_QUERY, {});

export function usePositions() {
  const data = usePreloadedQuery(POSITIONS_QUERY, queryRef);

  return data.positions as Positions;
}
