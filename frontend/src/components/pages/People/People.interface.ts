import { Option } from '@app/types/common';

export const peopleTableFormName = {
  band: 'band',
  search: 'search',
} as const;

export interface PeopleTableForm {
  [peopleTableFormName.band]: Option | null;
  [peopleTableFormName.search]: string;
}

export const PeopleStatus = {
  active: 'active',
  draft: 'draft',
  deactivated: 'deactivated',
} as const;

export interface Employee {
  id: number;
  name: string;
  title: string;
  laddersDetails: LadderDetails[];
  status: keyof typeof PeopleStatus;
}

export interface LadderDetails {
  ladderName: string;
  currentBand: number;
  activeGoal: boolean;
  goalProgress: number;
  latestActivity: number;
}

export interface PeopleDetails {
  total: number;
  page: number;
  count: number;
  results: Employee[];
  active: number;
  draft: number;
  deactivated: number;
}
