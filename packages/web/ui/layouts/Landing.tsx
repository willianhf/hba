import { MainLayout } from './Main';

interface LandingLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export function LandingLayout(props: LandingLayoutProps) {
  return <MainLayout title={props.title}>{props.children}</MainLayout>;
}
