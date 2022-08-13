import { useAuth } from '@/hooks';
import { Popover, Transition } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/outline';
import { XIcon, UserCircleIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { Authenticated } from '../../Authenticated';
import { Brand } from '../../Brand';
import { Button } from '../../Button';
import { Guest } from '../../Guest';
import { Link } from '../../Link';
import { NAVIGATION_ITEMS } from './Navigation';

export function MobileNavigation() {
  const auth = useAuth();

  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <Brand.Figure width={26} height={64} />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-300/50">
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <Authenticated>
                  {auth => (
                    <Link to={`/profile/${auth.user.username}`} className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-100">
                      <UserCircleIcon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                      <span className="text-base text-gray-900 font-medium ml-3">{auth.user.username}</span>
                    </Link>
                  )}
                </Authenticated>
                {NAVIGATION_ITEMS.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-100"
                  >
                    <item.icon className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span className="ml-3 text-base font-medium text-gray-900">{item.title}</span>
                  </Link>
                ))}
                <Authenticated>
                  <button
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-100"
                    onClick={auth.onLogout}
                    disabled={auth.isLogoutPending}
                  >
                    <LogoutIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                    <span className="text-base text-gray-900 font-medium ml-3">Sair</span>
                  </button>
                </Authenticated>
              </nav>
            </div>
          </div>
          <Guest>
            <div className="py-6 px-5 space-y-6">
              <Button as={Link} to="?form=signup" colorScheme="blue" className="w-full">
                Cadastrar
              </Button>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Já possui cadastro?{' '}
                <Button as={Link} to="?form=login" variant="link" colorScheme="blue">
                  Entrar
                </Button>
              </p>
            </div>
          </Guest>
        </div>
      </Popover.Panel>
    </Transition>
  );
}
