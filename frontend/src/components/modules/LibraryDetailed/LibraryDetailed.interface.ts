import { LadderBand } from '@app/types/common';

export interface LibraryDetailedProps {
  data: {
    ladderName: string;
    bands: Record<string, LadderBand>;
  };
}
