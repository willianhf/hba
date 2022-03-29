import { Popover, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  GlobeAltIcon,
  MenuIcon,
  TableIcon,
  UserGroupIcon,
  UserIcon,
  XIcon
} from '@heroicons/react/outline';
import { Fragment } from 'react';
import { useModal } from '@/hooks';
import { Brand } from '../Brand';
import { Button } from '../Button';
import { Link } from '../Link';
import { SignupModal } from './SignupModal';
import { Suspense } from 'react';

interface NavigationItem {
  title: string;
  href: string;
  icon: (props: any) => JSX.Element;
}

const navigationItems: NavigationItem[] = [
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

export function HeaderNavigation() {
  const signupModal = useModal();

  return (
    <>
      <SignupModal isOpen={signupModal.isOpen} onClose={signupModal.close} />
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
            <nav className="hidden md:flex space-x-10">
              {navigationItems.map(item => (
                <Button
                  key={item.href}
                  as={Link}
                  variant="link"
                  href={item.href}
                  className="flex items-center hover:text-gray-200"
                >
                  <item.icon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span className="ml-2">{item.title}</span>
                </Button>
              ))}
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Button variant="link">Entrar</Button>
              <Button colorScheme="red" className="ml-8" onClick={signupModal.open}>
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Brand.Figure width={26} height={64} />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-300/50">
                      <span className="sr-only">Fechar menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {navigationItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-100"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                        <span className="ml-3 text-base font-medium text-gray-900">{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <Button colorScheme="blue" onClick={signupModal.open} className="w-full">
                  Cadastrar
                </Button>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Já possui cadastro?{' '}
                  <Button variant="link" colorScheme="blue">
                    Entrar
                  </Button>
                </p>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
