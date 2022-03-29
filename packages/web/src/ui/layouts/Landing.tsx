import { Outlet } from 'react-router-dom';
import { MainLayout } from './Main';

export function LandingLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
