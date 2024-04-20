import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { LibraryDetailed } from '@app/components/modules/LibraryDetailed';
import { mapKeysToCamelCase } from '@app/utils';

async function getLadderDetails(slug: string) {
  const response = await fetch(`http://proxy/cpf/api/ladders/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ladder details');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data);
}

export default async function LadderDetailed({ params }: { params: { slug: string } }) {
  const data = await getLadderDetails(params.slug);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: '/library', current: false },
          { label: data.ladderName, href: `/library/${params.slug}`, current: true },
        ]}
      />
      {data && <LibraryDetailed data={data} />}
    </div>
  );
}
