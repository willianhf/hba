import { HeaderNavigation } from '../components';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <HeaderNavigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{props.children}</div>
    </>
  );
}
