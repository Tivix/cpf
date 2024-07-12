import { Bucket } from '@app/types/library';

export interface BucketDetailsProps {
  data: Bucket;
  bucketSlug: string;
  ladderName: string;
  ladderSlug: string;
}
