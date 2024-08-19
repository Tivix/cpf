import { BandWithBuckets } from '@app/types/library';

export interface MySpaceProps {
  data: {
    user: {
      firstName: string;
      lastName: string;
      photo?: string;
      position: string;
    };
    currentLevel: {
      band: number;
      score: number;
    };
    nextLevel: {
      band: number;
      threshold: number;
    };
    ladder?: {
      ladderName: string;
      bands: BandWithBuckets[];
    };
  };
}
