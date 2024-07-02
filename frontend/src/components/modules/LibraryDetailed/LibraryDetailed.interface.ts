import { LadderBand } from '@app/types/common';

export interface LibraryDetailedProps {
  ladderSlug: string;
  data: {
    ladderName: string;
    bands: Record<string, LadderBand>;
  };
}
