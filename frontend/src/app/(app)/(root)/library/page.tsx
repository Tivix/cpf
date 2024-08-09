import { Library } from '@app/components/pages/Library';
import { createClient } from '@app/utils/supabase/server';
import { mapKeysToCamelCase } from '@app/utils';
import { LadderCardInterface } from '@app/components/pages/Library/modules/LadderCard';

export default async function LibraryPage() {
  const supabase = createClient();
  const { data } = await supabase.from('ladder').select();

  const ladders = mapKeysToCamelCase<LadderCardInterface[]>(data);

  return <Library data={ladders} />;
}

export const dynamic = 'force-dynamic';
