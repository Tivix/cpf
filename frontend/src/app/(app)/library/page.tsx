import { mapKeysToCamelCase } from '@app/utils';
import { LadderCard, LadderCardInterface } from '@app/components/common/LadderCard';
import { API_URLS } from '@app/api';

async function getLadders() {
  const response = await fetch(API_URLS.library.ladders);

  if (!response.ok) {
    throw new Error('Failed to fetch ladders');
  }
  const data = await response.json();

  return mapKeysToCamelCase<LadderCardInterface[]>(data);
}

export default async function LibraryPage() {
  const data = await getLadders();

  return (
    <div>
      <h1 className="mb-10 text-l font-semibold leading-6 text-navy-900">CPF Library</h1>
      <p className="mb-6 tracking-wide text-navy-600">Select a career path to view the details.</p>
      <div className="grid grid-cols-3 gap-6">
        {data.map((ladder: LadderCardInterface) => (
          <LadderCard key={ladder.ladderSlug} {...ladder} />
        ))}
      </div>
    </div>
  );
}
