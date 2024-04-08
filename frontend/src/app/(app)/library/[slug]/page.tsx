import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { LadderTabs } from '@app/components/modules/LadderTabs';
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
  console.log('detailed', data.bands);
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: '/library', current: false },
          { label: data.ladderName, href: `/library/${params.slug}`, current: true },
        ]}
      />
      <section>
        <LadderTabs activeLadder={1} maximumLadders={Object.keys(data.bands).length} />
      </section>
    </div>
  );
}
