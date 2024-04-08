import { HomeIcon } from '@app/static/icons/HomeIcon';
import { PeopleIcon } from '@app/static/icons/PeopleIcon';
import { LayoutIcon } from '@app/static/icons/LayoutIcon';
import { DocumentIcon } from '@app/static/icons/DocumentIcon';

export const navigation = [
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
