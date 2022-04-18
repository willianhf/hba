import { Home } from '@/pages';
import { Players } from '@/pages/Players';
import { Layout } from '@/ui/layouts';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="players" element={<Players />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </ReactRouterRoutes>
  );
}
