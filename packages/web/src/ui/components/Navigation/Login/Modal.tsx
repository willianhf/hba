import { useNavigate, useSearchParams } from 'react-router-dom';
import { Modal } from '../../Modal';
import { LoginForm } from './Form';

export function LoginModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get('form') === 'login';

  return <Modal isOpen={isOpen} onClose={() => navigate({ search: '' })} title="Entrar" body={<LoginForm />} />;
}
