import { Library } from '@app/components/pages/Library';

export default async function LibraryPage() {
  return <Library data={[]} />;
}

export const dynamic = 'force-dynamic';
