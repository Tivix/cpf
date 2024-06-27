'use client';
import { Fragment } from 'react';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { NotificationIcon } from '@app/static/icons/NotificationIcon';

export const Topbar = () => {
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
            <Menu.Button className="bg-gray-800 focus:ring-offset-gray-800 relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Image
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
                width={32}
                height={32}
              />
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
            <Menu.Items className="ring-black absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {() => (
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm">
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
