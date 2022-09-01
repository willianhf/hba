import { createContext } from 'react';
import { useMutation, usePreloadedQuery } from 'react-relay';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStorage } from 'react-tidy';
import { match } from 'ts-pattern';
import { LOGOUT_MUTATION } from './LogoutMutation';
import { refetchUserQuery, userQueryRef, USER_QUERY } from './UserQuery';
import { LogoutMutation } from './__generated__/LogoutMutation.graphql';
import { UserQuery$data } from './__generated__/UserQuery.graphql';

export type User = UserQuery$data['user'];

export interface AuthContextType {
  user: User;
  verificationCode: string | null;
  isLoggedIn: boolean;
  onLogin(token: string, sessionId: string, verificationCode?: string): void;
  onLogout(): void;
  onVerified(): void;
  isLogoutPending: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface Props {
  children: React.ReactNode;
}

export function AuthProvider(props: Props) {
  const { user } = usePreloadedQuery(USER_QUERY, userQueryRef);

  const [token, setToken] = useStorage<string>('token');
  const [sessionId, setSessionId] = useStorage<string>('sessionId');
  const [verificationCode, setVerificationCode] = useStorage<string>('verificationCode');

  const navigate = useNavigate();
  const location = useLocation();

  const [commitLogout, isLogoutPending] = useMutation<LogoutMutation>(LOGOUT_MUTATION);

  const isLoggedIn = !!user?.id;

  function onLogin(token: string, sessionId: string, verificationCode?: string) {
    if (verificationCode) {
      setVerificationCode(verificationCode);
      navigate('?form=verification', { replace: true });
    } else {
      navigate(location.pathname, { replace: true });
    }

    setToken(token);
    setSessionId(sessionId);

    refetchUserQuery();
  }

  function onLogout() {
    commitLogout({
      variables: {
        input: {
          sessionId: sessionId!
        }
      },
      onCompleted: data => {
        match(data.logout.__typename)
          .with('LogoutPayload', () => {
            navigate({ pathname: '/', search: '' }, { replace: true });

            setToken(null);
            setVerificationCode(null);
            setSessionId(null);

            refetchUserQuery();
          })
          .run();
      }
    });
  }

  function onVerified() {
    navigate({ pathname: location.pathname, search: '' }, { replace: true });

    setVerificationCode(null);

    refetchUserQuery();
  }

  const value = {
    user,
    token,
    verificationCode,
    isLoggedIn,
    onLogin,
    onLogout,
    onVerified,
    isLogoutPending
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}
