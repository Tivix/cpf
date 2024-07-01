'use client';
import Link from 'next/link';
import { generateClassNames } from '@app/utils';
import { navigation } from './constants';
import { ChevronDoubleLeft } from '@app/static/icons/ChevronDoubleLeft';
import { Button } from '@headlessui/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const duration = 'duration-300' as const;

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <nav
      className={`sticky left-0 top-0 z-50 h-screen ${open ? 'w-72 px-3' : 'w-16 px-2'} ${duration} flex flex-col border-r border-navy-200 bg-white`}
    >
      <div className={`flex h-16 shrink-0 ${open ? 'justify-between' : 'justify-center'} mb-5 items-center`}>
        <div
          className={`${duration} flex ${open ? 'ml-3 w-[104px] text-base' : 'w-12 cursor-pointer text-xs'} h-11 items-center justify-center rounded-full border border-navy-900 font-semibold`}
          onClick={open ? undefined : toggleSidebar}
        >
          CPF
        </div>
        {open && (
          <Button onClick={toggleSidebar}>
            <ChevronDoubleLeft className={`flex ${duration}`} />
          </Button>
        )}
      </div>
      <ul role="list" className="flex flex-1 flex-col space-y-2">
        {navigation.map((item) => (
          <li key={item.name} className={`flex w-full ${open ? 'justify-start' : 'justify-center'}`}>
            <Link
              href={item.href}
              className={generateClassNames(
                'flex items-center whitespace-nowrap rounded-md p-2 font-medium text-navy-600 hover:bg-blue-100',
                {
                  'bg-blue-100 text-blue-900': pathname.startsWith(item.href),
                  'w-full': open,
                  'w-10 justify-center': !open,
                },
              )}
            >
              <div className={`flex items-center ${open ? 'gap-x-3' : ''} `}>
                <item.icon className="h-5 w-5" />
                <span className={`${duration} leading-6 ${open ? 'text-sm' : 'text-[0px]'}`}>{item.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
