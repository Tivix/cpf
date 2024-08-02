import { getBucketDetails } from '@app/api/bucket';
import { MySpaceBucketDetails } from '@app/components/pages/mySpace/MySpaceBucketDetails';

export default async function MySpaceBucketDetailed({ params }: { params: { bucket: string } }) {
  const { bucket } = params;
  // TODO: get proper data from api
  const data = await getBucketDetails(bucket);

  return <MySpaceBucketDetails data={data} />;
}
