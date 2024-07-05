import { Button } from '@app/components/common/Button';
import { routes } from '@app/constants';
import Link from 'next/link';

export default function People() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold leading-6 text-navy-900">People</h1>
        <Button>
          <Link href={routes.people.addNew.personalDetails}>+ Employee</Link>
        </Button>
      </div>
    </div>
  );
}
