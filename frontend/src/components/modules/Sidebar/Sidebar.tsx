'use client';
import Image from 'next/image';
import Link from 'next/link';
import { generateClassNames } from '@app/utils';
import { navigation } from './utils';
import { ChevronDoubleLeft } from '@app/static/icons/ChevronDoubleLeft';
import { Button } from '@headlessui/react';
import { useState } from 'react';

const duration = 'duration-300' as const;

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <nav
      className={`sticky left-0 top-0 z-50 h-screen ${open ? 'w-72' : 'w-16'} ${duration} flex flex-col border-r border-navy-200 bg-white px-3`}
    >
      <div className="flex h-16 shrink-0 justify-between">
        <div className={`${duration} flex ${open ? 'opacity-1' : 'opacity-0'}`}>
          <Image
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        <Button onClick={toggleSidebar}>
          <ChevronDoubleLeft className={`flex ${duration} ${open ? '' : 'mr-2 rotate-180'}`} />
        </Button>
      </div>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={generateClassNames(
                    'flex items-center whitespace-nowrap rounded-md p-2 font-medium text-navy-600 hover:bg-blue-100',
                    { 'bg-blue-100 text-blue-900': item.current },
                  )}
                >
                  <div className="flex items-center gap-x-3">
                    <item.icon className="h-5 w-5" />
                    <span className={`${duration} leading-6 ${open ? 'text-sm' : 'text-[0px]'}`}>{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
