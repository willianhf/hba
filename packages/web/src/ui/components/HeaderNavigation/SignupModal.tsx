import { useDebounce, useFetchQuery } from '@/hooks';
import { useEffect, useState } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';
import { SignupModalHabboProfileExistsQuery } from './__generated__/SignupModalHabboProfileExistsQuery.graphql';

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
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Cadastro"
      body={
        <form>
          <div className="space-y-2">
            <UsernameInput />
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

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [debouncedUsername] = useDebounce(username);

  const [queryReference, fetchHabboProfileExists, isFetching] =
    useFetchQuery<SignupModalHabboProfileExistsQuery>(HABBO_PROFILE_EXISTS_QUERY);

  useEffect(() => {
    if (debouncedUsername) {
      fetchHabboProfileExists({ username: debouncedUsername });
    }
  }, [debouncedUsername, fetchHabboProfileExists]);

  return (
    <TextInput
      label="Usuário"
      name="username"
      tooltip="Você deve utilizar o mesmo nome de usuário da sua conta do Habbo."
      onChange={({ target }) => setUsername(target.value)}
      isLoading={isFetching}
      error={queryReference && <NotFoundHabboUsernameError queryReference={queryReference} />}
    />
  );
}

function NotFoundHabboUsernameError(props: any) {
  const data = usePreloadedQuery<SignupModalHabboProfileExistsQuery>(HABBO_PROFILE_EXISTS_QUERY, props.queryReference);

  if (!data || data.habboProfileExists) {
    return null;
  }

  return <span>Nome de usuário não encontrado no Habbo.</span>;
}
