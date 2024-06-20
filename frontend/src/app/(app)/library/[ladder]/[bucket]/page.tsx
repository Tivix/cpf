import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { mapKeysToCamelCase } from '@app/utils';
import { API_URLS } from '@app/api';

async function getBucketDetails(slug: string) {
  const response = await fetch(`${API_URLS.library.buckets}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch bucket details');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data);
}

export default async function BucketDetailed({ params }: { params: { bucket: string; ladder: string } }) {
  const { bucket, ladder } = params;
  const data = await getBucketDetails(bucket);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: '/library', current: false },
          { label: 'ladderName', href: `/library/${ladder}`, current: false },
          { label: data.bucketName, href: `/library/${bucket}`, current: true },
        ]}
      />
      {data && <div>TO DO ...</div>}
    </div>
  );
}
