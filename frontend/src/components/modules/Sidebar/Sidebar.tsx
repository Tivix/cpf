'use client';
import Link from 'next/link';
import { generateClassNames } from '@app/utils';
import { navigation } from './constants';
import { ChevronDoubleLeftIcon } from '@app/static/icons/ChevronDoubleLeftIcon';
import { Button as HeadlessButton } from '@headlessui/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const duration = 'duration-300' as const;

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <nav
      className={`z-50 h-screen ${open ? 'w-72' : 'w-[62px]'} ${duration} flex flex-col border-r border-navy-200 bg-white px-3`}
    >
      <div className="flex h-16 shrink-0 items-center justify-between">
        <div
          className={`${duration} flex h-11 items-center justify-center rounded-full border ${open ? 'opacity-1 w-[104px]' : 'w-0 opacity-0'}`}
        >
          CPF
        </div>
        <HeadlessButton onClick={toggleSidebar}>
          <ChevronDoubleLeftIcon className={`flex ${duration} ${open ? '' : 'mr-2 rotate-180'}`} />
        </HeadlessButton>
      </div>
      <ul role="list" className="flex flex-1 flex-col space-y-2">
        {navigation.map((item) => (
          <li key={item.name} className={`flex w-full`}>
            <Link
              href={item.href}
              className={generateClassNames(
                'flex w-full items-center whitespace-nowrap rounded-md p-2 font-medium text-navy-600 hover:bg-blue-100',
                { 'bg-blue-100 text-blue-900': pathname.startsWith(item.href) },
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
    </nav>
  );
};
