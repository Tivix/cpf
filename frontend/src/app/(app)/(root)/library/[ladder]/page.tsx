import { LadderDetails } from '@app/components/pages/LadderDetails';

export default async function LadderDetailed({ params }: { params: { ladder: string } }) {
  return <LadderDetails ladderSlug={params.ladder} data={undefined} />;
}

export const dynamic = 'force-dynamic';
