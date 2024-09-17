import { BandWithBuckets } from '@app/types/library';

export interface LadderDetailsProps {
  ladderSlug: string;
  bands: BandWithBuckets[];
}

export interface LadderDetailsHook {
  currentBand: number;
  handleLadderChange: (ladder: number) => void;
  tabsProps: {
    activeLadder: number;
    maximumLadders: number;
  };
}
