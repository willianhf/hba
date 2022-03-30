import { useDebounce, useRefetchableQuery } from '@/hooks';
import { UseRefetchableQueryArgs } from '@/hooks/useRefetchableQuery';
import { useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';
import {
  SignupModalHabboProfileExistsQuery,
  SignupModalHabboProfileExistsQuery$variables
} from './__generated__/SignupModalHabboProfileExistsQuery.graphql';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HABBO_PROFILE_EXISTS_QUERY = graphql`
  query SignupModalHabboProfileExistsQuery($username: String!) {
    habboProfileExists(username: $username)
  }
`;

export function SignupModal(props: ModalProps) {
  const [refetchProfile, isPending, args] = useRefetchableQuery({ username: '' });

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Cadastro"
      body={
        <form>
          <div className="space-y-2">
            <UsernameInput args={args} isPending={isPending} refetchProfile={refetchProfile} />
            <TextInput.Password label="Senha" name="password" />
            <TextInput.Password label="Confirmar senha" name="confirm-password" />
          </div>
          <div className="space-y-1 text-center">
            <Button colorScheme="blue" className="w-full mt-5">
              Cadastrar
            </Button>
            <div className="text-gray-800">ou</div>
            <Button variant="link" colorScheme="blue">
              Entrar
            </Button>
          </div>
        </form>
      }
    />
  );
}

interface UsernameInputProps {
  args: UseRefetchableQueryArgs<SignupModalHabboProfileExistsQuery$variables>;
  refetchProfile: (variables: SignupModalHabboProfileExistsQuery$variables) => void;
  isPending: boolean;
}

function UsernameInput(props: UsernameInputProps) {
  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username);

  const data = useLazyLoadQuery<SignupModalHabboProfileExistsQuery>(
    HABBO_PROFILE_EXISTS_QUERY,
    props.args.variables,
    props.args.options
  );

  useEffect(() => {
    if (debouncedUsername) {
      props.refetchProfile({ username: debouncedUsername });
    }
  }, [debouncedUsername]);

  const hasError = debouncedUsername && !data.habboProfileExists;

  return (
    <TextInput
      label="Usuário"
      name="username"
      tooltip="Você deve utilizar o mesmo nome de usuário da sua conta do Habbo."
      onChange={({ target }) => setUsername(target.value)}
      isLoading={props.isPending}
      error={hasError ? 'Nome de usuário não encontrado no Habbo.' : undefined}
    />
  );
}
