import { useNavigate, useSearchParams } from 'react-router-dom';
import { Guest } from '../../Guest';
import { Modal } from '../../Modal';
import { LoginForm } from './Form';

export function LoginModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get('form') === 'login';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => navigate(-1)}
      title="Entrar"
      body={
        isOpen && (
          <Guest redirect>
            <LoginForm />
          </Guest>
        )
      }
    />
  );
}
