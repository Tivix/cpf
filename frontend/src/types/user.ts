export interface User extends UserProfile {
  ladders: UserLadder[];
  notifications?: {
    slack: boolean;
    email: boolean;
  };
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  role: string;
  position: string;
}

export interface UserLadder {
  id: number;
  ladder: {
    ladderName: string;
    ladderSlug: string;
  };
  band: {
    bandNumber: number;
  };
  technologies: string[];
  isMainLadder: boolean;
}

export const userStatus = {
  active: 'active',
  draft: 'draft',
  deactivated: 'deactivated',
} as const;
