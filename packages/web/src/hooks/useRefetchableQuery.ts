import { useCallback, useState, useTransition } from 'react';
import { FetchPolicy, Variables as RelayVariables } from 'react-relay';

export interface UseRefetchableQueryArgs<Variables> {
  variables: Variables;
  options: {
    fetchKey: number;
    fetchPolicy: FetchPolicy;
  };
}

export function useRefetchableQuery<Variables extends RelayVariables>(initialVariables: Variables) {
  const [isPending, startTransition] = useTransition();
  const [args, setArgs] = useState<UseRefetchableQueryArgs<Variables>>({
    variables: initialVariables,
    options: {
      fetchKey: 0,
      fetchPolicy: 'store-or-network'
    }
  });

  const fetchFn = useCallback((variables: Variables) => {
    startTransition(() => {
      setArgs(prev => ({
        variables,
        options: {
          fetchKey: prev.options.fetchKey + 1,
          fetchPolicy: 'store-and-network'
        }
      }));
    });
  }, []);

  return [fetchFn, isPending, args] as const;
}
