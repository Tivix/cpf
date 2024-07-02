import { mapKeysToCamelCase } from '@app/utils';
import { API_URLS } from '.';
import { Bucket } from '@app/types/common';

async function getBucketDetails(slug: string) {
  const response = await fetch(`${API_URLS.library.buckets}/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch bucket details');
  }
  const data = await response.json();

  return mapKeysToCamelCase<Bucket>(data);
}

export { getBucketDetails };
