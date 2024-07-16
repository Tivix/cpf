export const StatusType = {
  active: 'active',
  draft: 'draft',
  deactivated: 'deactivated',
} as const;

export interface PeopleDetails {
  total: number;
  page: number;
  count: number;
  results: Employee[];
  active: number;
  draft: number;
  deactivated: number;
}

export interface Employee {
  id: number;
  name: string;
  title: string;
  laddersDetails: LadderDetails[];
  status: keyof typeof StatusType;
}

export interface LadderDetails {
  ladderName: string;
  currentBand: number;
  activeGoal: boolean;
  goalProgress: number;
  latestActivity: number;
}

export interface User {
  photo?: string;
  firstName: string;
  lastName: string;
  email: string;
  ladders: {
    ladderName: string;
    technology: string;
    band: string | number;
  }[];
  notifications: {
    slack: boolean;
    email: boolean;
  };
}
