import { BucketDetails } from '@app/components/pages/BucketDetails';
import { getBucketDetails } from '@app/api/bucket';

export default async function BucketDetailed({ params }: { params: { bucket: string; ladder: string } }) {
  const { bucket, ladder } = params;
  const data = await getBucketDetails(bucket);

  return <BucketDetails data={data} ladderName={''} ladderSlug={ladder} bucketSlug={bucket} />;
}

export const dynamic = 'force-dynamic';
