import React, { createContext } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useLocation, useNavigate } from 'react-router';
import { useStorage } from 'react-tidy';
import { match } from 'ts-pattern';
import { AuthContext_LogoutMutation } from './__generated__/AuthContext_LogoutMutation.graphql';

export interface AuthContextType {
  user: any;
  verificationCode: string | null;
  isLoggedIn: boolean;
  onLogin(user: any, token: string, sessionId: string, verificationCode: string | null): void;
  onLogout(): void;
  onVerified(user: any): void;
  isLogoutPending: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface Props {
  children: React.ReactNode;
}

const LOGOUT_MUTATION = graphql`
  mutation AuthContext_LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      __typename
      ... on ApplicationError {
        message
      }
      ... on LogoutPayload {
        itWorked
      }
    }
  }
`;

export function AuthProvider(props: Props) {
  const [user, setUser] = useStorage<any>('user');
  const [token, setToken] = useStorage<string>('token');
  const [sessionId, setSessionId] = useStorage<string>('sessionId');
  const [verificationCode, setVerificationCode] = useStorage<string>('verificationCode');

  const navigate = useNavigate();
  const location = useLocation();

  const [commit, isPending] = useMutation<AuthContext_LogoutMutation>(LOGOUT_MUTATION);

  const isLoggedIn = !!user;

  function onLogin(user: any, token: string, sessionId: string, verificationCode: string | null) {
    if (verificationCode) {
      setVerificationCode(verificationCode);
      navigate('?form=verification', { replace: true });
    } else {
      navigate(location.pathname, { replace: true });
    }

    setUser(user);
    setToken(token);
    setSessionId(sessionId);
  }

  function onLogout() {
    commit({
      variables: {
        input: {
          sessionId: sessionId!
        }
      },
      onCompleted: data => {
        match(data.logout.__typename)
          .with('LogoutPayload', () => {
            navigate('/');

            setUser(null);
            setToken(null);
            setVerificationCode(null);
          })
          .run();
      }
    });
  }

  function onVerified(user: any) {
    navigate(location.pathname, { replace: true });

    setUser(user);
    setVerificationCode(null);
  }

  const value = {
    user,
    token,
    verificationCode,
    isLoggedIn,
    onLogin,
    onLogout,
    onVerified,
    isLogoutPending: isPending
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}
