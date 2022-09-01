import { useCallback } from 'react';
import { NavigateOptions, useNavigate as useRouterNavigate, type To } from 'react-router-dom';
import { useLocation } from './useLocation';

export function useNavigate() {
  const location = useLocation();
  const navigate = useRouterNavigate();

  const navigateFn = useCallback(
    (to: To, options?: NavigateOptions) => {
      const state = options?.state ?? {};

      navigate(to, {
        ...options,
        state: {
          ...state,
          from: location
        }
      });
    },
    [navigate]
  );

  return navigateFn;
}
