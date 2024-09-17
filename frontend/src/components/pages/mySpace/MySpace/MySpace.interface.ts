import { BandWithBuckets } from '@app/types/library';
import { UserLadder } from '@app/types/user';

export interface MySpaceProps {
  user: {
    firstName: string;
    lastName: string;
    photo?: string;
    position: string;
  };

  ladder?: {
    userLadder: UserLadder;
    bands: BandWithBuckets[];
    nextBand?: BandWithBuckets;
  };
}
