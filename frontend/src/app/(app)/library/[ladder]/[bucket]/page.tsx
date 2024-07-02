import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { BucketDetails } from '@app/components/modules/BucketDetails';
import { getLadderName } from '@app/api/ladder';
import { getBucketDetails } from '@app/api/bucket';
import { routes } from '@app/constants';

export default async function BucketDetailed({ params }: { params: { bucket: string; ladder: string } }) {
  const { bucket, ladder } = params;
  const data = await getBucketDetails(bucket);
  const ladderName = await getLadderName(ladder);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: routes.library.index, current: false },
          { label: ladderName, href: `${routes.library.index}/${ladder}`, current: false },
          { label: data.bucketName, href: `${routes.library.index}/${ladder}/${bucket}`, current: true },
        ]}
      />
      {data && <BucketDetails data={data} />}
    </div>
  );
}

export const dynamic = 'force-dynamic';
