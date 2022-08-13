import { Popover } from '@headlessui/react';
import { ChartBarIcon, GlobeAltIcon, MenuIcon, TableIcon, UserGroupIcon, UserIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useLocation } from 'react-router';
import { Brand } from '../../Brand';
import { Button } from '../../Button';
import { Guest } from '../../Guest';
import { Link } from '../../Link';
import { LoginModal } from '../Login/Modal';
import { SignupModal } from '../Signup/Modal';
import { VerificationModal } from '../Verification/Modal';
import { Menu } from './Menu';
import { MobileNavigation } from './MobileMenu';

interface NavigationItem {
  title: string;
  to: string;
  icon: (props: any) => JSX.Element;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Jogadores',
    to: '/players',
    icon: UserIcon
  },
  {
    title: 'Equipes',
    to: '/teams',
    icon: UserGroupIcon
  },
  {
    title: 'Partidas',
    to: '/games',
    icon: GlobeAltIcon
  },
  {
    title: 'Classificação',
    to: '/standings',
    icon: TableIcon
  },
  {
    title: 'Estatísticas',
    to: '/stats',
    icon: ChartBarIcon
  }
];

interface NavigationItemProps {
  to: string;
  title: string;
  icon: any;
}

function NavigationItem(props: NavigationItemProps) {
  const location = useLocation();
  const isFocused = location.pathname.startsWith(props.to);

  return (
    <Button
      key={props.to}
      as={Link}
      variant="link"
      to={props.to}
      className={clsx(
        'flex items-center hover:text-gray-200 px-3 py-2 rounded-md',
        isFocused && 'bg-blue-800 text-gray-200'
      )}
    >
      <props.icon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
      <span className="ml-2">{props.title}</span>
    </Button>
  );
}

export function Navigation() {
  return (
    <>
      <SignupModal />
      <LoginModal />
      <VerificationModal />
      <Popover className="relative bg-blue-700">
        <div className="md:px-8 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex items-center justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="inline-flex">
                <Brand.Logo width={95} height={32} />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-blue-700 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-slate-300/30">
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <nav className="hidden md:flex space-x-6">
              {NAVIGATION_ITEMS.map(item => (
                <NavigationItem key={item.to} to={item.to} title={item.title} icon={item.icon} />
              ))}
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Guest>
                <Button as={Link} to="?form=login" variant="link">
                  Entrar
                </Button>
                <Button as={Link} to="?form=signup" colorScheme="red" className="ml-8">
                  Cadastrar
                </Button>
              </Guest>
              <Menu />
            </div>
          </div>
        </div>
        <MobileNavigation />
      </Popover>
    </>
  );
}
