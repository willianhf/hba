import { AuthContextType } from '@/contexts/AuthContext';
import { User } from '@/contexts/AuthContext/AuthContext';
import { useAuth } from '@/hooks';
import { To } from 'react-router-dom';
import { Navigate } from './Navigate';

type Auth = AuthContextType & { user: NonNullable<User> };

interface Props {
  redirect?: To;
  children: React.ReactNode | ((auth: Auth) => React.ReactNode);
}

export function Authenticated(props: Props) {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    if (props.redirect) {
      return <Navigate to={props.redirect} />;
    }

    return null;
  }

  const children = typeof props.children === 'function' ? props.children(auth as Auth) : props.children;

  return <>{children}</>;
}
