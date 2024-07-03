import { LadderBand } from '@app/types/library';

export interface LibraryDetailedProps {
  ladderSlug: string;
  data: {
    ladderName: string;
    bands: Record<string, LadderBand>;
  };
}
