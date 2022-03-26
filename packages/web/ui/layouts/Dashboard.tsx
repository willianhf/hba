import { MainLayout } from './Main';

interface DashboardProps {
  title?: string;
  children: React.ReactNode;
}

export function DashboardLayout(props: DashboardProps) {
  return <MainLayout title={props.title}>{props.children}</MainLayout>;
}
