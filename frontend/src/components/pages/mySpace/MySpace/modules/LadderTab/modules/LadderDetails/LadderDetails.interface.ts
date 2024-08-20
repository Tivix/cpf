import { BandWithBuckets } from '@app/types/library';

export interface LadderDetailsProps {
  ladder: BandWithBuckets;
  ladderSlug: string;
  ladderName: string;
  band: number;
}
