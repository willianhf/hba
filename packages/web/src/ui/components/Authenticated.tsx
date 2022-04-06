import { AuthContextType } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks';
import { Navigate } from './Navigate';

interface Props {
  redirect?: boolean;
  children: React.ReactNode | ((auth: AuthContextType) => React.ReactNode);
}

export function Authenticated(props: Props) {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    if (props.redirect) {
      return <Navigate to="?form=login" />;
    }

    return null;
  }

  const children = typeof props.children === 'function' ? props.children(auth) : props.children;

  return <>{children}</>;
}
