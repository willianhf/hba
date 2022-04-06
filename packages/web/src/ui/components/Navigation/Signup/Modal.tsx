import { useNavigate, useSearchParams } from 'react-router-dom';
import { Guest } from '../../Guest';
import { Modal } from '../../Modal';
import { SignupForm } from './Form';

export function SignupModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get('form') === 'signup';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => navigate(-1)}
      title="Cadastro"
      body={
        isOpen && (
          <Guest redirect>
            <SignupForm />
          </Guest>
        )
      }
    />
  );
}
