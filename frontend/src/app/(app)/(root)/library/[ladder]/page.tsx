import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { LibraryDetailed } from '@app/components/modules/LibraryDetailed';
import { mapKeysToCamelCase } from '@app/utils';
import { API_URLS } from '@app/api';
import { LadderBand } from '@app/types/common';
import { routes } from '@app/constants';

async function getLadderDetails(slug: string) {
  const response = await fetch(`${API_URLS.library.ladders}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ladder details');
  }
  const data = await response.json();

  return mapKeysToCamelCase<{
    ladderName: string;
    bands: Record<string, LadderBand>;
  }>(data);
}

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
