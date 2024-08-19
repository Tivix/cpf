import { LadderBandBucket } from '@app/types/library';

export interface BucketCardProps {
  bucket: LadderBandBucket;
  withLevel?: boolean;
  withStatus?: boolean;
  href: string;
}
