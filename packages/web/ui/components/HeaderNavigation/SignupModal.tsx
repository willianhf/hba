import { Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';
import { Tooltip } from '../Tooltip';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupModal(props: ModalProps) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Cadastro"
      body={
        <>
          <div className="space-y-2">
            <TextInput
              label="Usuário"
              name="username"
              tooltip="Você deve utilizar o mesmo nome de usuário da sua conta do Habbo."
            />
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
        </>
      }
    />
  );
}
