export interface LadderInterface {
  [positionName: string]: number[];
}

export interface LadderTabsProps {
  maximumLadders: number;
  activeLadder: number;
  ladderOnClick?: (ladder: number) => void;
  currentBand?: number;
}
