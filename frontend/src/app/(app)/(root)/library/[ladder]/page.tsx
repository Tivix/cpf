import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { LibraryDetailed } from '@app/components/modules/LibraryDetailed';
import { getLadderDetails } from '@app/api/ladder';
import { routes } from '@app/constants';

export default async function LadderDetailed({ params }: { params: { ladder: string } }) {
  const data = await getLadderDetails(params.ladder);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: routes.library.index, current: false },
          { label: data.ladderName, href: `${routes.library.index}/${params.ladder}`, current: true },
        ]}
      />
      {data && <LibraryDetailed ladderSlug={params.ladder} data={data} />}
    </div>
  );
}

export const dynamic = 'force-dynamic';
