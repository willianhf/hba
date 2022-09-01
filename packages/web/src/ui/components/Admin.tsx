import { AuthContextType } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks';
import { To } from 'react-router-dom';
import { Authenticated } from './Authenticated';
import { Navigate } from './Navigate';

interface Props {
  redirect?: To;
  children: React.ReactNode | ((auth: AuthContextType) => React.ReactNode);
}

export function Admin(props: Props) {
  const auth = useAuth();

  if (!auth.user?.isAdmin) {
    if (props.redirect) {
      return (
        <Authenticated redirect={{ search: 'form=login' }}>
          <Navigate to={props.redirect} />
        </Authenticated>
      );
    }

    return <Authenticated>{null}</Authenticated>;
  }

  const children = typeof props.children === 'function' ? props.children(auth) : props.children;

  return <Authenticated>{children}</Authenticated>;
}
