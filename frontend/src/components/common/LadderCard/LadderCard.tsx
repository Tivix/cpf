import Link from 'next/link';
import { LadderCardInterface } from './LadderCard.interface';
import { routes } from '@app/components/modules/Sidebar/utils';

export const LadderCard = ({ ladderName, ladderSlug }: LadderCardInterface) => (
  <Link
    href={`${routes.library.index}/${ladderSlug}`}
    className="flex h-44 cursor-pointer items-center justify-center rounded-2xl border border-navy-200 bg-white hover:bg-navy-100"
  >
    <h2>{ladderName}</h2>
  </Link>
);
