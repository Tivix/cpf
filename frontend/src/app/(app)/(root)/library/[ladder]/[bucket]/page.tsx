import { BucketDetails } from '@app/components/pages/BucketDetails';
import { getLadderName } from '@app/api/ladder';
import { getBucketDetails } from '@app/api/bucket';

export default async function BucketDetailed({ params }: { params: { bucket: string; ladder: string } }) {
  const { bucket, ladder } = params;
  const data = await getBucketDetails(bucket);
  const ladderName = await getLadderName(ladder);

  return <BucketDetails data={data} ladderName={ladderName} ladderSlug={ladder} bucketSlug={bucket} />;
}

export const dynamic = 'force-dynamic';
