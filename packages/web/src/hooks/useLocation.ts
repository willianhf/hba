import { Location, useLocation as useRouterLocation } from 'react-router-dom';

type State = { from?: Location } | null;

export function useLocation() {
  const location = useRouterLocation();
  const state = location.state as State;

  return { ...location, state };
}
