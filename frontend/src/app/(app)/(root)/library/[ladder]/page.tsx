import { getLadderDetails } from '@app/api/ladder';
import { LadderDetails } from '@app/components/pages/LadderDetails';

export default async function LadderDetailed({ params }: { params: { ladder: string } }) {
  const data = await getLadderDetails(params.ladder);

  return <LadderDetails ladderSlug={params.ladder} data={data} />;
}

export const dynamic = 'force-dynamic';
