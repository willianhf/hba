import { useNavigate, useSearchParams } from 'react-router-dom';
import { Authenticated } from '../../Authenticated';
import { Modal } from '../../Modal';
import { VerificationForm } from './Form';

export function VerificationModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get('form') === 'verification';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => navigate(-1)}
      title="Verificar"
      body={
        <Authenticated redirect>
          <VerificationForm />
        </Authenticated>
      }
    />
  );
}
