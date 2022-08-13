import { useLocation } from './useLocation';

export function usePreviousPath() {
  const location = useLocation();
  const paths = location.pathname.split('/');
  paths.pop();

  return paths.join('/');
}
