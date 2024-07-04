import { HomeIcon } from '@app/static/icons/HomeIcon';
import { PeopleIcon } from '@app/static/icons/PeopleIcon';
import { LayoutIcon } from '@app/static/icons/LayoutIcon';
import { DocumentIcon } from '@app/static/icons/DocumentIcon';
import { routes } from '@app/constants';

export const navigation = [
  {
    name: 'My space',
    href: routes.mySpace.index,
    icon: HomeIcon,
  },
  {
    name: 'People',
    href: routes.people.index,
    icon: PeopleIcon,
  },
  {
    name: 'CPF Library',
    href: routes.library.index,
    icon: LayoutIcon,
  },
  {
    name: 'Documentation',
    href: routes.documentation.index,
    icon: DocumentIcon,
  },
];
