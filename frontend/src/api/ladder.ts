import { mapKeysToCamelCase } from '@app/utils';
import { API_URLS } from '.';
import { LadderBand } from '@app/types/library';

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

export { getLadderDetails };
