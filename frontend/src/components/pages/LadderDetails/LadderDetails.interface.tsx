import { LadderBand } from '@app/types/library';

export interface LadderDetailsProps {
  ladderSlug: string;
  data?: {
    ladderName: string;
    bands: Record<string, LadderBand>;
  };
}

export interface LadderDetailsHook {
  currentBand: number;
  handleLadderChange: (ladder: number) => void;
  tabsProps: {
    activeLadder: number;
    maximumLadders: number;
  };
}
