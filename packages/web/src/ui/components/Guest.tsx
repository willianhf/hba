import { useAuth } from '@/hooks';
import { To } from 'react-router-dom';
import { Navigate } from './Navigate';

interface Props {
  redirect?: To;
  children: React.ReactNode;
}

export function Guest(props: Props) {
  const auth = useAuth();

  if (auth.isLoggedIn) {
    if (props.redirect) {
      return <Navigate to={props.redirect} />;
    }

    return null;
  }

  return <>{props.children}</>;
}
