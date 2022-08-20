import { Home } from '@/pages';
import { Players } from '@/pages/Players';
import { ProfileUsernameApply, ProfileUsernameRoute } from '@/pages/ProfileUsername';
import { ApplyTeam, Teams } from '@/pages/Teams';
import { Authenticated } from '@/ui/components';
import { Layout } from '@/ui/layouts';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="players">
          <Route index element={<Players />} />
        </Route>
        <Route path="teams">
          <Route index element={<Teams />} />
          <Route path="apply" element={<ApplyTeam />} />
        </Route>
        <Route path="profile/:username">
          <Route index element={<ProfileUsernameRoute />} />
          <Route
            path="apply"
            element={
              <Authenticated>
                <ProfileUsernameApply />
              </Authenticated>
            }
          />
        </Route>
      </Route>
    </ReactRouterRoutes>
  );
}
