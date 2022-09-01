import { Home } from '@/pages';
import { Admin as AdminPage } from '@/pages/Admin';
import { Matches as AdminMatches, matchesLoader } from '@/pages/Admin/Matches';
import { MatchRegister, matchRegisterLoader } from '@/pages/Admin/MatchRegister';
import { Matches } from '@/pages/Matches';
import { Players } from '@/pages/Players';
import { ProfileUsernameApply, ProfileUsernameRoute } from '@/pages/ProfileUsername';
import { ApplyTeam, Teams } from '@/pages/Teams';
import { Layout } from '@/ui/layouts';
import { DataBrowserRouter, Route } from 'react-router-dom';

export function Routes() {
  return (
    <DataBrowserRouter>
      <Route path="/" element={<Layout />} errorElement={null}>
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
          <Route path="apply" element={<ProfileUsernameApply />} />
        </Route>
        <Route path="matches" element={<Matches />} loader={matchesLoader} />
        <Route path="admin" element={<AdminPage />}>
          <Route path="matches" element={<AdminMatches />} loader={matchesLoader} />
          <Route path="matches/register" element={<MatchRegister />} loader={matchRegisterLoader} />
        </Route>
      </Route>
    </DataBrowserRouter>
  );
}
