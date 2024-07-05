import { getLadders } from '@app/api/ladder';
import { Library } from '@app/components/pages/Library';

export default async function LibraryPage() {
  const data = await getLadders();

  return <Library data={data} />;
}

export const dynamic = 'force-dynamic';
