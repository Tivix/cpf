import { BandWithBuckets } from '@app/types/library';

export interface LadderTabProps {
  bands: BandWithBuckets[];
  currentLevel?: number;
}

export interface LadderTabHooks {
  currentBand: number;
  handleLadderChange: (ladder: number) => void;
  tabsProps: {
    activeLadder: number;
    maximumLadders: number;
  };
}
