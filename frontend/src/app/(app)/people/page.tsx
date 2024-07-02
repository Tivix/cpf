import Link from 'next/link';

export default function People() {
  return (
    <div>
      <h1 className="mb-10 text-lg font-semibold leading-6 text-navy-900">People</h1>
      <Link href={'/people/add-new/personal-details'}>+ Add people</Link>
    </div>
  );
}
