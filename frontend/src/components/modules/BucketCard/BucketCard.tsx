import Link from 'next/link';
import { BucketCardProps } from './BucketCard.interface';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { Typography } from '@app/components/common/Typography';
import { AdvancementLevel } from '@app/components/common/AdvancementLevel';

export const BucketCard = ({ bucket, withLevel, href }: BucketCardProps) => {
  const { bucketName, description } = bucket;

  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy-200 bg-white p-6 hover:bg-navy-100"
    >
      <div className="flex justify-between">
        <Typography variant="head-s/semibold" as="h2">
          {bucketName}
        </Typography>
        <div className="flex flex-row gap-6">
          {withLevel && (
            <div className="flex flex-row items-center gap-4">
              <Typography variant="body-m/medium" className="text-navy-600">
                Level #
              </Typography>
              <AdvancementLevel level={1} />
            </div>
          )}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50">
            <ChevronRightIcon className="text-navy-500" />
          </div>
        </div>
      </div>
      <Typography variant="body-m/regular" className="text-navy-600">
        {description}
      </Typography>
    </Link>
  );
};
