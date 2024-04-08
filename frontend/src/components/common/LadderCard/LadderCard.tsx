import Link from 'next/link';
import { LadderCardInterface } from './LadderCard.interface';

export const LadderCard = ({ ladderName, ladderSlug }: LadderCardInterface) => (
  <Link
    href={`/library/${ladderSlug}`}
    className="border border-navy-200 bg-white rounded-2xl flex justify-center items-center h-44 cursor-pointer hover:bg-navy-200"
  >
    <h2>{ladderName}</h2>
  </Link>
);
