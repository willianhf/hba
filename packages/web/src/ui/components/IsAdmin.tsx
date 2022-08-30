import { AuthContextType } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks';
import { Authenticated } from './Authenticated';
import { Navigate } from './Navigate';

interface Props {
  redirect?: boolean;
  children: React.ReactNode | ((auth: AuthContextType) => React.ReactNode);
}

export function IsAdmin(props: Props) {
  const auth = useAuth();

  if (!auth.user.isAdmin) {
    if (props.redirect) {
      return <Navigate to="/" />;
    }

    return <Authenticated>{null}</Authenticated>;
  }

  const children = typeof props.children === 'function' ? props.children(auth) : props.children;

  return <Authenticated>{children}</Authenticated>;
}
