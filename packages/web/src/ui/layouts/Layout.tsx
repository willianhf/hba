import { Outlet } from 'react-router';
import { Navigation } from '../components';

export function Layout() {
  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  );
}
