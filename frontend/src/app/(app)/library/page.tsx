import { LadderCard, LadderCardInterface } from '@app/components/common/LadderCard';
import { getLadders } from '@app/api/ladder';

export default async function LibraryPage() {
  const data = await getLadders();

  return (
    <div>
      <h1 className="text-lg mb-10 font-semibold leading-6 text-navy-900">CPF Library</h1>
      <p className="mb-6 tracking-wide text-navy-600">Select a career path to view the details.</p>
      <div className="grid grid-cols-3 gap-6">
        {data.map((ladder: LadderCardInterface) => (
          <LadderCard key={ladder.ladderSlug} {...ladder} />
        ))}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
