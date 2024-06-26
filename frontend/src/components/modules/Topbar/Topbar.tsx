'use client';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { NotificationIcon } from '@app/static/icons/NotificationIcon';
import { Avatar } from '@app/components/common/Avatar';
import { UserIcon } from '@app/static/icons/UserIcon';
import { LogoutIcon } from '@app/static/icons/LogoutIcon';

export const Topbar = () => {
  // TODO: get user from some context
  const user = {
    firstName: 'Jane',
    lastName: 'Edge',
  };

  const menuItems = [
    {
      href: '/people/my-profile',
      label: 'Profile settings',
      icon: <UserIcon />,
    },
    {
      href: '#',
      label: 'Sign out',
      icon: <LogoutIcon />,
    },
  ];

  return (
    <div className="bg-white mx-auto p-4 border-b border-navy-200 sticky top-0 z-40 shrink-0">
      <div className="flex justify-end items-center px-2">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 focus:outline-none focus:ring-2"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <NotificationIcon className="h-5 w-5 text-navy-600" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Avatar firstName={user.firstName} lastName={user.lastName} size="44" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {menuItems.map(({ href, label, icon }) => (
                <Menu.Item key={label}>
                  <a href={href} className="flex items-center gap-3 px-4 py-2 text-sm text-navy-700 hover:bg-navy-100">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </a>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
