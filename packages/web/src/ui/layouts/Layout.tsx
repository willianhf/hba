import { AuthProvider } from '@/contexts';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../components';

interface Props {
  children?: React.ReactNode;
}

export function Layout(props: Props) {
  return (
    <Suspense>
      <AuthProvider>
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
          {props.children}
        </div>
      </AuthProvider>
    </Suspense>
  );
}
