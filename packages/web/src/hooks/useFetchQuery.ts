import { useCallback, useState } from 'react';
import { useQueryLoader, useRelayEnvironment } from 'react-relay';
import { fetchQuery, GraphQLTaggedNode, OperationType } from 'relay-runtime';

export function useFetchQuery<TQuery extends OperationType>(query: GraphQLTaggedNode) {
  const environment = useRelayEnvironment();
  const [isFetching, setFetching] = useState(false);

  const [queryReference, loadQuery] = useQueryLoader<TQuery>(query);

  const fetchFn = useCallback(
    (variables: TQuery['variables']) => {
      if (isFetching) {
        return;
      }

      setFetching(true);
      fetchQuery(environment, query, variables).subscribe({
        complete: () => {
          setFetching(false);
          // @ts-ignore
          loadQuery(variables, { fetchPolicy: 'store-only' });
        },
        error: () => {
          setFetching(false);
        }
      });
    },
    [isFetching]
  );

  return [queryReference, fetchFn, isFetching] as const;
}
