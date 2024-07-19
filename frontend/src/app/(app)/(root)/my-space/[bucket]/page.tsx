import { getBucketDetails } from '@app/api/bucket';
import { routes } from '@app/constants';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';

export default async function MySpaceBucketDetailed({ params }: { params: { bucket: string } }) {
  const { bucket } = params;
  const data = await getBucketDetails(bucket);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'My space', href: routes.mySpace.index, current: false },
          { label: data.bucketName, href: `${routes.library.index}/${bucket}`, current: true },
        ]}
      />
    </div>
  );
}
