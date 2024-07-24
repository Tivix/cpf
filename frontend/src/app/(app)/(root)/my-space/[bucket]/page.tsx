import { getBucketDetails } from '@app/api/bucket';
import { MySpaceBucketDetails } from '@app/components/pages/MySpaceBucketDetails';

export default async function MySpaceBucketDetailed({ params }: { params: { bucket: string } }) {
  const { bucket } = params;
  const data = await getBucketDetails(bucket);

  return <MySpaceBucketDetails data={data} />;
}
