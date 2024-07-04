export interface Point {
  x: number;
  y: number;
}

export interface Employee {
  id: number;
  name: string;
  title: string;
  laddersDetails: LadderDetails[];
  status: {
    active: boolean;
    draft: boolean;
    deactivated: boolean;
  };
}

export interface LadderDetails {
  ladderName: string;
  currentBand: number;
  activeGoal: boolean;
  goalProgress: number;
  latestActivity: number;
}
