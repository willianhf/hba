import { Home } from '@/pages';
import { Players } from '@/pages/Players';
import { Profile } from '@/pages/Profile';
import { ApplyPlayer } from '@/pages/Profile/Players/Apply';
import { Teams } from '@/pages/Teams';
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
        </Route>
        <Route path="profile">
          <Route path=":username" element={<Profile />} />
          <Route
            path=":username/apply"
            element={
              <Authenticated>
                <ApplyPlayer />
              </Authenticated>
            }
          />
        </Route>
      </Route>
    </ReactRouterRoutes>
  );
}
