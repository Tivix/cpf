import Link from 'next/link';
import { BucketCardProps } from './BucketCard.interface';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import {routes} from "@app/components/modules/Sidebar/utils";

export const BucketCard = ({ bucket, ladderSLug }: BucketCardProps) => {
  const { bucketSlug, bucketName, description } = bucket;

  return (
    <Link
      href={`${routes.library.index}/${ladderSLug}/${bucketSlug}`}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy-200 bg-white p-6 hover:bg-navy-100"
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-navy-900">{bucketName}</h2>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50">
          <ChevronRightIcon className="text-navy-500" />
        </div>
      </div>
      <p className="text-base text-navy-600">{description}</p>
    </Link>
  );
};
