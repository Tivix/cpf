export interface LadderInterface {
  [positionName: string]: number[];
}

export interface LadderTabsProps {
  maximumLadders: number;
  activeLadder: number;
  ladderOnClick?: (ladder: number) => void;
  currentBand?: number | undefined;
}

export interface StepProps {
  ladder: number;
  currentBand?: number;
  lastInGroup: boolean;
  activeLadder: number;
  ladderOnClick?: (ladder: number) => void;
}

export interface TabButtonProps {
  ladder: number;
  disabled?: boolean;
  currentBand?: number;
  activeLadder: number;
  ladderOnClick?: (ladder: number) => void;
}
