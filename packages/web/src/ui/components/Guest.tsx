import { useAuth } from '@/hooks';
import { useLocation } from 'react-router';
import { Navigate } from './Navigate';

interface Props {
  redirect?: boolean;
  children: React.ReactNode;
}

export function Guest(props: Props) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoggedIn) {
    if (props.redirect) {
      return <Navigate to={location.pathname} />;
    }

    return null;
  }

  return <>{props.children}</>;
}
