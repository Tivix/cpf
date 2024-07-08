import { mapKeysToCamelCase } from '@app/utils';
import { API_URLS } from '.';
import { Employee } from '@app/types/people';

async function getPeople(tab: string, page: string, band: string) {
  // DELETE RETURN WHEN API AVAILABLE
  return;
  const bandQuery = band ? `&band=${band}` : '';
  const url = `${API_URLS.people}?tab=${tab}&page=${page}${bandQuery}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch people');
  }
  const data = await response.json();

  return mapKeysToCamelCase<Employee[]>(data);
}

export { getPeople };
