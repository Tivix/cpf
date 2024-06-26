import { LadderBand } from '@app/types/library';

export interface LibraryDetailedProps {
  data: {
    ladderName: string;
    bands: Record<string, LadderBand>;
  };
}
