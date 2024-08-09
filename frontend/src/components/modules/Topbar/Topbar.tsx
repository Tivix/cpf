import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { NotificationIcon } from '@app/static/icons/NotificationIcon';
import { Avatar } from '@app/components/common/Avatar';
import { UserIcon } from '@app/static/icons/UserIcon';
import { LogoutIcon } from '@app/static/icons/LogoutIcon';
import Link from 'next/link';
import { useTopbar } from './Topbar.hooks';

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
];
export const Topbar = async () => {
  const { handleSignOut } = useTopbar();

  return (
    <div className="sticky top-0 z-40 mx-auto shrink-0 border-b border-navy-200 bg-white p-4">
      <div className="flex items-center justify-end px-2">
        <button
          type="button"
          className="bg-gray-800 text-gray-400 relative rounded-full p-1 focus:outline-none focus:ring-2"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <NotificationIcon className="h-5 w-5 text-navy-600" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="bg-gray-800 focus:ring-offset-gray-800 relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Avatar firstName={user.firstName} lastName={user.lastName} variant="40" />
            </MenuButton>
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
            <MenuItems className="ring-black absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none">
              {menuItems.map(({ href, label, icon }) => (
                <MenuItem key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-navy-700 hover:bg-navy-100"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem key="Sign out">
                <form action={handleSignOut}>
                  <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-navy-700 hover:bg-navy-100">
                    <span>
                      <LogoutIcon />
                    </span>
                    <span>Sign out</span>
                  </button>
                </form>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
