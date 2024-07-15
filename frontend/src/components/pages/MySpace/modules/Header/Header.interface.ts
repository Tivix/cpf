export interface HeaderProps {
  user: {
    firstName: string;
    lastName: string;
    photo?: string;
    position: string;
  };
  currentLevel: {
    band: number;
    score: number;
  };
  nextLevel: {
    band: number;
    threshold: number;
  };
}
