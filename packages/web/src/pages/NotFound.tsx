import { useLocation } from '@/hooks';
import { Button, Link, Text } from '@/ui/components';

export function NotFound() {
  const location = useLocation();

  return (
    <div>
      <Text as="h1" variant="title" className="mb-2">
        Página não encontrada
      </Text>
      <div className="flex">
        <Button as={Link} to={location.state?.from ?? '/'} colorScheme="red">
          Voltar
        </Button>
      </div>
    </div>
  );
}
