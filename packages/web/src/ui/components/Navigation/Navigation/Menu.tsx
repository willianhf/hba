import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Authenticated } from '../../Authenticated';
import { Link } from '../../Link';
import { Text } from '../../Text';

interface MenuItemProps {
  children: React.ReactNode;
}

function MenuItem(props: MenuItemProps) {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <div
          className={clsx(
            'flex rounded-md items-center w-full',
            'px-3 py-2',
            'text-sm font-medium',
            'cursor-pointer',
            active && 'bg-gray-200'
          )}
        >
          {props.children}
        </div>
      )}
    </HeadlessMenu.Item>
  );
}

export function Menu() {
  return (
    <Authenticated>
      {auth => (
        <HeadlessMenu as="div" className="relative">
          <HeadlessMenu.Button className="flex items-center text-white hover:text-gray-200 space-x-2 focus:outline-none">
            <UserCircleIcon className="w-6 h-6" />
            <span className="text-base font-semibold">{auth.user.username}</span>
            <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
          </HeadlessMenu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <HeadlessMenu.Items
              className={clsx(
                'mt-2 px-2 py-2',
                'bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                'absolute right-0 w-56 origin-top-right',
                'space-y-1'
              )}
            >
              <Link to={`/profile/${auth.user.username}`}>
                <MenuItem>
                  <Text>Perfil</Text>
                </MenuItem>
              </Link>
              <MenuItem>
                <button onClick={auth.onLogout} disabled={auth.isLogoutPending}>
                  <Text color="error">Sair</Text>
                </button>
              </MenuItem>
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      )}
    </Authenticated>
  );
}
