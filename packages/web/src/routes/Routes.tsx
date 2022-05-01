import { Home } from '@/pages';
import { Players } from '@/pages/Players';
import { UserPlayerRegister } from '@/pages/Players/User/Register';
import { Authenticated } from '@/ui/components';
import { Layout } from '@/ui/layouts';
import { Suspense } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="players">
          <Route index element={<Players />} />
          <Route
            path="register"
            element={
              <Suspense fallback={null}>
                <Authenticated redirect>
                  <UserPlayerRegister />
                </Authenticated>
              </Suspense>
            }
          />
        </Route>
      </Route>
    </ReactRouterRoutes>
  );
}
