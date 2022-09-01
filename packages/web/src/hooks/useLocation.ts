import { Location, useLocation as useRouterLocation } from 'react-router-dom';

type State<T> = ({ from: Location } & T) | null;

export function useLocation<T = {}>() {
  const location = useRouterLocation();
  const state = location.state as State<T>;

  return { ...location, state };
}
