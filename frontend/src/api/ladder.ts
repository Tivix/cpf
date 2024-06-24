import { mapKeysToCamelCase } from '@app/utils';
import { API_URLS } from '.';

async function getLadders() {
  const response = await fetch(API_URLS.library.ladders);

  if (!response.ok) {
    throw new Error('Failed to fetch ladders');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data);
}

async function getLadderDetails(slug: string) {
  const response = await fetch(`${API_URLS.library.ladders}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ladder details');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data);
}

async function getLadderName(slug: string) {
  const response = await fetch(`${API_URLS.library.ladders}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ladder details');
  }
  const data = await response.json();

  return mapKeysToCamelCase(data).ladderName;
}

export { getLadders, getLadderDetails, getLadderName };
