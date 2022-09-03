import { NotFound } from '@/pages';
import { Layout } from '@/ui/layouts';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function RouterErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return <div>Alguma coisa deu errado</div>;
}
