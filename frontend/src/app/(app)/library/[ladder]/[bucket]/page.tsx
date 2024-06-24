import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { BucketDetails } from '@app/components/modules/BucketDetails';
import { getLadderName } from '@app/api/ladder';
import { getBucketDetails } from '@app/api/bucket';

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

export const dynamic = 'force-dynamic';
