import { useSearchParams } from 'react-router-dom';
import { Modal } from '../../Modal';
import { VerificationForm } from './Form';

export function VerificationModal() {
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get('form') === 'verification';

  return <Modal isOpen={isOpen} title="Verificar" body={<VerificationForm />} />;
}
