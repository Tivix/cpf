import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { mapKeysToCamelCase } from '@app/utils';
import { BucketDetails } from '@app/components/modules/BucketDetails';

async function getBucketDetails(slug: string) {
  const response = await fetch(`http://proxy/cpf/api/library/buckets/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch bucket details');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data);
}

async function getLadderName(slug: string) {
  const response = await fetch(`http://proxy/cpf/api/library/ladders/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ladder details');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data).ladderName;
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
          { label: data.bucketName, href: `/library/${bucket}`, current: true },
        ]}
      />
      {data && <BucketDetails data={data} />}
    </div>
  );
}
