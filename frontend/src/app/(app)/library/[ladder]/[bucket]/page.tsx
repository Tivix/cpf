import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { mapKeysToCamelCase } from '@app/utils';
import { BucketDetails } from '@app/components/modules/BucketDetails';
import { API_URLS } from '@app/api';
import { Bucket, LadderBand } from '@app/types/common';

async function getBucketDetails(slug: string) {
  const response = await fetch(`${API_URLS.library.buckets}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch bucket details');
  }
  const data = await response.json();

  return mapKeysToCamelCase<Bucket>(data);
}

async function getLadderName(slug: string) {
  const response = await fetch(`${API_URLS.library.ladders}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ladder details');
  }
  const data = await response.json();

  return mapKeysToCamelCase<{
    ladderName: string;
    bands: Record<string, LadderBand>;
  }>(data).ladderName;
}

export default async function BucketDetailed({ params }: { params: { bucket: string; ladder: string } }) {
  const { bucket, ladder } = params;
  const data = await getBucketDetails(bucket);
  const ladderName = await getLadderName(ladder);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: '/library', current: false },
          { label: ladderName, href: `/library/${ladder}`, current: false },
          { label: data.bucketName, href: `/library/${ladder}/${bucket}`, current: true },
        ]}
      />
      {data && <BucketDetails data={data} />}
    </div>
  );
}
