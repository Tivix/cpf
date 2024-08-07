import { BandWithBuckets } from '@app/types/library';

export interface LadderDetailsProps {
  data: BandWithBuckets;
  ladderSlug: string;
  ladderName: string;
  band: number;
}
