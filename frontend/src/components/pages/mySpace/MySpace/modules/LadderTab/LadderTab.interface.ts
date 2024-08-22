import { BandWithBuckets } from '@app/types/library';
import { UserLadder } from '@app/types/people';

export interface LadderTabProps {
  bands: BandWithBuckets[];
  ladder: UserLadder;
}

export interface LadderTabHooks {
  currentBand: number;
  handleLadderChange: (ladder: number) => void;
  tabsProps: {
    activeLadder: number;
    maximumLadders: number;
  };
}
