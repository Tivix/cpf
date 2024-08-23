import { Option } from '@app/types/common';
import { userStatus } from '@app/types/user';

export const peopleTableFormName = {
  band: 'band',
  search: 'search',
} as const;

export interface PeopleTableForm {
  [peopleTableFormName.band]: Option | null;
  [peopleTableFormName.search]: string;
}

export interface Employee {
  id: number;
  name: string;
  title: string;
  laddersDetails: LadderDetails[];
  status: keyof typeof userStatus;
}

export interface LadderDetails {
  ladderName: string;
  currentBand: number;
  activeGoal: boolean;
  goalProgress: number;
  pendingActions: number;
  lastActivityDate?: string;
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
