import { Option } from '@app/types/common';
import { userStatus } from '@app/types/user';

export const peopleTableFormName = {
  band: 'band',
  search: 'search',
  rows: 'rows',
  page: 'page',
} as const;

export interface PeopleTableForm {
  [peopleTableFormName.band]: Option | null;
  [peopleTableFormName.search]: string | null;
  [peopleTableFormName.rows]: Option | null;
  [peopleTableFormName.page]: number;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface IEmployeeRequestResult {
  results: Employee[];
  count: number;
}

export interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: keyof typeof userStatus;
  role: string;
  ladder_slug: string;
  current_band: string | null;
  technologies: string[];
  is_main_ladder: boolean | null;
  ladder_name: string;
  ladder_tech: string[];
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
