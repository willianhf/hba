import { useAuth } from '@/hooks';
import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { match } from 'ts-pattern';
import { Authenticated } from '../../Authenticated';
import { Button } from '../../Button';
import { Error } from '../../Error';
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

  function onVerificationSuccess(user: any) {
    auth.onVerified(user);
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
          .with({ __typename: 'ConfirmUserVerificationPayload' }, confirmUserVerification =>
            onVerificationSuccess(confirmUserVerification.user)
          )
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
      <span className="mb-2 text-gray-900">
        Insira esse código na missão do seu usuário no Habbo e depois clique em verificar.
      </span>
      <Button onClick={onSubmit} colorScheme="blue" className="w-full mt-5" isLoading={isInFlight}>
        Verificar
      </Button>
    </div>
  );
}
