import { People } from '@app/components/pages/People';
import { createClient } from '@app/utils/supabase/server';

async function getPeople() {
  const supabase = createClient();
  const { data: band_bucket, error } = await supabase.from('band_bucket').select('*');

  if (error) {
    console.log('error', error);
  } else {
    console.log('band_bucket', band_bucket);
  }
}

export default async function PeoplePage() {
  const data = await getPeople();
  console.log('data', data);
  return <People />;
}
