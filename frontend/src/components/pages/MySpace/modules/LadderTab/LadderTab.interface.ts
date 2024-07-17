import { LadderBand } from '@app/types/library';

export interface LadderTabProps {
  bands: Record<string, LadderBand>;
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
