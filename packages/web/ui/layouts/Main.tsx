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
      {props.children}
    </>
  );
}
