import Image from 'next/image';
import { HomeIcon } from '@app/static/icons/HomeIcon';
import { PeopleIcon } from '@app/static/icons/PeopleIcon';
import { LayoutIcon } from '@app/static/icons/LayoutIcon';
import { DocumentIcon } from '@app/static/icons/DocumentIcon';
import Link from 'next/link';

const navigation = [
  { name: 'My space', href: '#', current: false, icon: HomeIcon },
  {
    name: 'People',
    href: '#',
    current: false,
    icon: PeopleIcon,
  },
  {
    name: 'CPF Library',
    href: 'library',
    current: true,
    icon: LayoutIcon,
  },
  {
    name: 'Documentation',
    href: '#',
    current: false,
    icon: DocumentIcon,
  },
];

export const Sidebar = () => {
  return (
    <nav className="flex col-span-2 flex-col bg-white px-3 border-r border-navy-200">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Logo"
          width={32}
          height={32}
        />
      </div>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${item.current ? 'bg-blue-100 text-blue-900' : ''} flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-medium text-navy-600 hover:bg-blue-100`}
                >
                  <item.icon className={`w-5 h-5`} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
