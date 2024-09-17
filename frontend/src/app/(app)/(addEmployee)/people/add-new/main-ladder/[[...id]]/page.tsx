import { MainLadder as MainLadderPage } from '@app/components/pages/People/addEmployee/MainLadder';
import { createClient } from '@app/utils/supabase/server';

const getLadders = async () => {
  const supabase = createClient();
  const { data: ladders, error } = await supabase.from('ladder').select();

  if (!error) {
    return ladders.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.ladder_slug]: curr.ladder_tech,
      }),
      {},
    );
  }
};

export default async function MainLadder() {
  const data = await getLadders();

  return <MainLadderPage data={data} />;
}
