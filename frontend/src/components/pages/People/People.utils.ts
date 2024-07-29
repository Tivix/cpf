import { PeopleStatus } from './People.interface';

export const PEOPLE_DETAILS = {
  total: 100,
  page: 1,
  count: 11,
  results: [
    {
      id: 4262433,
      name: 'A. Smith',
      title: 'Front-End Developer, Junior',
      laddersDetails: [
        {
          ladderName: 'Front End',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 35,
          pendingActions: 5,
          lastActivityDate: '6-22-2024',
        },
      ],
      status: PeopleStatus.active,
    },
    {
      id: 42624,
      name: 'Marvin',
      title: 'DevOps Developer',
      laddersDetails: [
        {
          ladderName: 'DevOps',
          currentBand: 5,
          activeGoal: false,
          goalProgress: 65,
          pendingActions: 2,
        },
        {
          ladderName: 'Manager',
          currentBand: 1,
          activeGoal: false,
          goalProgress: 25,
          pendingActions: 4,
        },
        {
          ladderName: 'QA',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 35,
          pendingActions: 1,
          lastActivityDate: '7-11-2024',
        },
      ],
      status: PeopleStatus.active,
    },
    {
      id: 9933,
      name: 'Joe',
      title: 'Back-end',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 3,
          activeGoal: true,
          goalProgress: 45,
          pendingActions: 3,
          lastActivityDate: '5-29-2024',
        },
      ],
      status: PeopleStatus.active,
    },
    {
      id: 493683,
      name: 'John',
      title: 'Back-end, Regular',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 2,
          activeGoal: false,
          goalProgress: 15,
          pendingActions: 2,
        },
      ],
      status: PeopleStatus.active,
    },
    {
      id: 422433,
      name: 'Joe',
      title: 'Back-end, Senior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 1,
          activeGoal: true,
          goalProgress: 45,
          pendingActions: 3,
          lastActivityDate: '7-16-2024',
        },
      ],
      status: PeopleStatus.deactivated,
    },
    {
      id: 4893,
      name: 'Alex',
      title: 'Junior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 45,
          pendingActions: 3,
        },
      ],
      status: PeopleStatus.deactivated,
    },
    {
      id: 42673,
      name: 'Joe',
      title: 'QA, Junior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 4,
          activeGoal: true,
          goalProgress: 25,
          pendingActions: 2,
        },
      ],
      status: PeopleStatus.deactivated,
    },
    {
      id: 4773,
      name: 'John',
      title: 'QA, Junior',
      laddersDetails: [
        {
          ladderName: 'QA',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 95,
          pendingActions: 2,
        },
      ],
      status: PeopleStatus.draft,
    },
    {
      id: 33,
      name: 'J. Adams',
      title: 'DevOps, Junior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 5,
          activeGoal: true,
          goalProgress: 75,
          pendingActions: 4,
        },
      ],
      status: PeopleStatus.draft,
    },
    {
      id: 433,
      name: 'Fred',
      title: 'Front End, Junior',
      laddersDetails: [
        {
          ladderName: 'QA',
          currentBand: 3,
          activeGoal: true,
          goalProgress: 35,
          pendingActions: 2,
        },
      ],
      status: PeopleStatus.draft,
    },
    {
      id: 42243,
      name: 'Joe',
      title: 'QA, Regular',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 4,
          activeGoal: false,
          goalProgress: 75,
          pendingActions: 2,
        },
      ],
      status: PeopleStatus.draft,
    },
  ],
  active: 11,
  draft: 80,
  deactivated: 9,
};

export const bands = [
  { name: 'Band 1', id: '1' },
  { name: 'Band 2', id: '2' },
  { name: 'Band 3', id: '3' },
  { name: 'Band 4', id: '4' },
  { name: 'Band 5', id: '5' },
];

export const rowsPerPage = 10;
export const paginationMaxPages = 8;
export const startPagesWithoutTruncation = 3;

export const employeeMenuOptions = [
  {
    href: '/people/my-profile',
    label: 'Profile settings',
  },
];
