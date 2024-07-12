import { routes } from '@app/constants';

export const DEFAULT_TAB = 'ladder';

export const mySpaceTabs = [
  {
    key: 'ladder',
    label: 'Ladder',
    href: `${routes.mySpace.index}?tab=ladder`,
  },
  {
    key: 'score-card',
    label: 'Score Card',
    href: `${routes.mySpace.index}?tab=score-card`,
  },
  {
    key: 'goals',
    label: 'Goals',
    href: `${routes.mySpace.index}?tab=goals`,
  },
  {
    key: 'projects',
    label: 'Projects',
    href: `${routes.mySpace.index}?tab=projects`,
  },
  {
    key: 'activity',
    label: 'Activity',
    href: `${routes.mySpace.index}?tab=activity`,
  },
];
