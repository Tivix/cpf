import { People } from '@app/components/pages/People';
import { createClient } from '@app/utils/supabase/server';
import { userStatus } from '@app/types/user';

async function getPeople(status?: keyof typeof userStatus) {
  if (status) {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('get_employees_by_status', { _status: status });

    if (error) {
      console.log('error', error);
    } else {
      return data;
    }
  }
}

export default async function PeoplePage({ searchParams }: { searchParams: { tab: keyof typeof userStatus } }) {
  const data = await getPeople(searchParams.tab);
  return <People data={data} />;
}
