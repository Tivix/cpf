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
