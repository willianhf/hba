import Head from 'next/head';
import { HeaderNavigation } from '../components';

export interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const DEFAULT_TITLE = 'HBA - Habbo Basketball Association';

export function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{props.title ?? DEFAULT_TITLE}</title>
      </Head>
      <HeaderNavigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{props.children}</div>
    </>
  );
}