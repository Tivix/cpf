import { Button } from '@app/components/common/Button';
import Link from 'next/link';

export default function People() {
  return (
    <div>
      <h1 className="mb-10 text-lg font-semibold leading-6 text-navy-900">People</h1>
      <Button>
        <Link href={'/people/add-new/personal-details'}>+ Employee</Link>
      </Button>
    </div>
  );
}
