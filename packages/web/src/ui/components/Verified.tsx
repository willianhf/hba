import { AuthContextType } from '@/contexts/AuthContext';
import { User } from '@/contexts/AuthContext/AuthContext';
import { useAuth } from '@/hooks';
import { To } from 'react-router-dom';
import { Authenticated } from './Authenticated';
import { Navigate } from './Navigate';

type Auth = AuthContextType & {
  user: Required<User> & { isVerified: true };
};

interface Props {
  redirect?: To;
  children: React.ReactNode | ((auth: Auth) => React.ReactNode);
}

export function Verified(props: Props) {
  const auth = useAuth();

  if (!auth.user?.isVerified) {
    if (props.redirect) {
      return (
        <Authenticated redirect={{ search: 'form=login' }}>
          <Navigate to={props.redirect} />
        </Authenticated>
      );
    }

    return <Authenticated>{null}</Authenticated>;
  }

  const children = typeof props.children === 'function' ? props.children(auth as Auth) : props.children;

  return <Authenticated>{children}</Authenticated>;
}
