import { Menu, Popover, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  MenuIcon,
  TableIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/solid';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useLocation } from 'react-router';
import { Authenticated } from '../Authenticated';
import { Brand } from '../Brand';
import { Button } from '../Button';
import { Guest } from '../Guest';
import { Link } from '../Link';
import { LoginModal } from './Login/Modal';
import { MobileMenu } from './MobileMenu';
import { SignupModal } from './Signup/Modal';
import { VerificationModal } from './Verification/Modal';

interface NavigationItem {
  title: string;
  href: string;
  icon: (props: any) => JSX.Element;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Jogadores',
    href: '/players',
    icon: UserIcon
  },
  {
    title: 'Equipes',
    href: '/teams',
    icon: UserGroupIcon
  },
  {
    title: 'Partidas',
    href: '/games',
    icon: GlobeAltIcon
  },
  {
    title: 'Classificação',
    href: '/standings',
    icon: TableIcon
  },
  {
    title: 'Estatísticas',
    href: '/stats',
    icon: ChartBarIcon
  }
];

interface NavigationItemProps {
  href: string;
  title: string;
  icon: any;
}

function NavigationItem(props: NavigationItemProps) {
  const location = useLocation();
  const isFocused = location.pathname.startsWith(props.href);

  return (
    <Button
      key={props.href}
      as={Link}
      variant="link"
      href={props.href}
      className={clsx('flex items-center hover:text-gray-200 px-3 py-2 rounded-md', isFocused && 'bg-blue-800 text-gray-200')}
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
              <Link href="/" className="inline-flex">
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
                <NavigationItem href={item.href} title={item.title} icon={item.icon} />
              ))}
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Guest>
                <Button as={Link} href="?form=login" variant="link">
                  Entrar
                </Button>
                <Button as={Link} href="?form=signup" colorScheme="red" className="ml-8">
                  Cadastrar
                </Button>
              </Guest>
              <Authenticated>
                {auth => (
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center text-white hover:text-gray-200 space-x-2 focus:outline-none">
                      <UserCircleIcon className="w-6 h-6" />
                      <span className="text-base font-semibold">{auth.user.username}</span>
                      <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={auth.onLogout}
                                disabled={auth.isLogoutPending}
                                className={clsx(
                                  'text-red-600 group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium',
                                  active && 'bg-gray-200 text-red-700'
                                )}
                              >
                                Sair
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </Authenticated>
            </div>
          </div>
        </div>
        <MobileMenu />
      </Popover>
    </>
  );
}
