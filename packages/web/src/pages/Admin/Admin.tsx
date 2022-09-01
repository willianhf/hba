import { useLocation } from '@/hooks';
import { Admin as IsAdmin, Link, Text } from '@/ui/components';
import { GlobeAltIcon, UserGroupIcon, UserIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

interface SideItemProps {
  to: string;
  Icon: any;
  title: string;
}

function SideItem(props: SideItemProps) {
  const location = useLocation();
  const isSelected = location.pathname.split('/').includes(props.to);

  return (
    <Link
      to={props.to}
      className={clsx(
        'flex items-center w-full rounded-md py-2 px-3 hover:bg-gray-200 transition-colors',
        isSelected && 'bg-gray-200'
      )}
    >
      <props.Icon className="flex-shrink-0 h-5 w-5 mr-2 text-gray-900" aria-hidden="true" />
      <Text weight="medium">{props.title}</Text>
    </Link>
  );
}

export function Admin() {
  const location = useLocation();

  return (
    <IsAdmin redirect={location.state?.from ?? '/'}>
      <Text as="h1" variant="title" className="mb-2">
        Painel de administração
      </Text>
      <div className="flex space-x-4">
        <div className="rounded-lg bg-white border border-gray-300 shadow-sm p-2 w-64 space-y-1 max-h-max">
          <SideItem to="players" title="Jogadores" Icon={UserIcon} />
          <SideItem to="teams" title="Equipes" Icon={UserGroupIcon} />
          <SideItem to="matches" title="Partidas" Icon={GlobeAltIcon} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </IsAdmin>
  );
}
