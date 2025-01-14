import Link from 'next/link';
import { BucketCardProps } from './BucketCard.interface';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { Typography } from '@app/components/common/Typography';
import { LevelDots } from '@app/components/modules/LevelDots';
import { StatusChip } from '@app/components/common/StatusChip';

export const BucketCard = ({ bucket, withLevel, withStatus, href }: BucketCardProps) => {
  const { bucketName, description, status } = bucket;
  const level = 1; //TODO: replace with real value from api

  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy-200 bg-white p-6 hover:bg-navy-100"
    >
      <div className="flex justify-between">
        <Typography variant="head-s/semibold" as="h2">
          {bucketName}
        </Typography>
        <div className="flex flex-row items-center gap-6">
          {withLevel && (
            <div className="flex flex-row items-center gap-4">
              <Typography variant="body-m/medium" className="text-navy-600">
                Level {level ?? '#'}
              </Typography>
              <LevelDots level={level} />
            </div>
          )}
          {withStatus && <StatusChip variant="green">{status}</StatusChip>}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50">
            <ChevronRightIcon className="text-navy-500" />
          </div>
        </div>
      </div>
      <Typography variant="body-m/regular" className="truncate text-navy-600">
        {description}
      </Typography>
    </Link>
  );
};
