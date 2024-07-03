import Link from 'next/link';
import { BucketCardProps } from './BucketCard.interface';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { routes } from '@app/constants';
import { Typography } from '@app/components/common/Typography';

export const BucketCard = ({ bucket, ladderSlug }: BucketCardProps) => {
  const { bucketSlug, bucketName, description } = bucket;

  return (
    <Link
      href={`${routes.library.index}/${ladderSlug}/${bucketSlug}`}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy-200 bg-white p-6 hover:bg-navy-100"
    >
      <div className="flex justify-between">
        <Typography variant="head-s/semibold" as="h2">
          {bucketName}
        </Typography>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50">
          <ChevronRightIcon className="text-navy-500" />
        </div>
      </div>
      <Typography variant="body-m/regular" className="text-navy-600">
        {description}
      </Typography>
    </Link>
  );
};
