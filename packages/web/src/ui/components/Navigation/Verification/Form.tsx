import { useAuth } from '@/hooks';
import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { match } from 'ts-pattern';
import { Button } from '../../Button';
import { Error } from '../../Error';
import { Text } from '../../Text';
import { FormConfirmUserVerificationMutation } from './__generated__/FormConfirmUserVerificationMutation.graphql';

const CONFIRM_VERIFICATION_MUTATION = graphql`
  mutation FormConfirmUserVerificationMutation($input: ConfirmUserVerificationInput!) {
    confirmUserVerification(input: $input) {
      __typename
      ... on ApplicationError {
        message
      }
      ... on AuthenticationError {
        message
      }
      ... on ConfirmUserVerificationPayload {
        itWorked
        user {
          id
          username
          isAdmin
          isVerified
        }
      }
    }
  }
`;

export function VerificationForm() {
  const auth = useAuth();

  const [commit, isInFlight] = useMutation<FormConfirmUserVerificationMutation>(CONFIRM_VERIFICATION_MUTATION);

  const [error, setError] = useState('');

  function onVerificationSuccess() {
    auth.onVerified();
  }

  function onVerificationFailure(message: string) {
    setError(message);
  }

  function onSubmit() {
    commit({
      variables: {
        input: {}
      },
      onCompleted: data => {
        match(data.confirmUserVerification)
          .with({ __typename: 'ConfirmUserVerificationPayload' }, onVerificationSuccess)
          .with({ __typename: 'ApplicationError' }, error => onVerificationFailure(error.message))
          .run();
      }
    });
  }

  return (
    <div className="text-center">
      {error && <Error>{error}</Error>}
      <div className="my-2">
        <span className="p-2 rounded bg-gray-300 text-gray-800 font-bold text-xl tracking-widest inline-block mx-auto">
          {auth.verificationCode}
        </span>
      </div>
      <div className="mb-4 text-gray-900">
        Insira esse código na missão do seu usuário no Habbo em seguida clique no botão abaixo para verificar.
      </div>
      <Button onClick={onSubmit} colorScheme="blue" fillParent isLoading={isInFlight}>
        Verificar
      </Button>
      <Text className="my-1" as="div">
        ou
      </Text>
      <Button onClick={auth.onLogout} colorScheme="red" fillParent isLoading={auth.isLogoutPending}>
        Sair
      </Button>
    </div>
  );
}
