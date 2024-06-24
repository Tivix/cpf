import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { LibraryDetailed } from '@app/components/modules/LibraryDetailed';
import { getLadderDetails } from '@app/api/ladder';

export default async function LadderDetailed({ params }: { params: { ladder: string } }) {
  const data = await getLadderDetails(params.ladder);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: '/library', current: false },
          { label: data.ladderName, href: `/library/${params.ladder}`, current: true },
        ]}
      />
      {data && <LibraryDetailed data={data} />}
    </div>
  );
}

export const dynamic = 'force-dynamic';
