import { Button } from '@app/components/common/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href={'/people/add-new/personal-details'}>
        <Button>+ Add people</Button>
      </Link>
    </div>
  );
}
