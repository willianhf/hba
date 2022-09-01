import { useNavigate, useSearchParams } from 'react-router-dom';
import { Modal } from '../../Modal';
import { SignupForm } from './Form';

export function SignupModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get('form') === 'signup';

  return <Modal isOpen={isOpen} onClose={() => navigate({ search: '' })} title="Cadastro" body={<SignupForm />} />;
}
