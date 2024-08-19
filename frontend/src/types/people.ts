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
}

export interface UserLadder {
  ladder: {
    ladderName: string;
    ladderSlug: string;
  };
  band: {
    bandNumber: number;
  };
  technology: string;
}
