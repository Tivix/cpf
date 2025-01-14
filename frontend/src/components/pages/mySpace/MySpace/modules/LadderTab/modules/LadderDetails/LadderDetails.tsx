import { LadderDetailsProps } from './LadderDetails.interface';
import { BucketType, LadderBandBucket } from '@app/types/library';
import { Typography } from '@app/components/common/Typography';
import { ThresholdCard } from '@app/components/modules/ThresholdCard';
import { BucketCard } from '@app/components/modules/BucketCard';
import { routes } from '@app/constants';

export const LadderDetails = ({ ladder, ladderName, band }: LadderDetailsProps) => {
  const softSkills = ladder.buckets.filter(({ bucketType }) => bucketType === BucketType.soft);
  const hardSkills = ladder.buckets.filter(({ bucketType }) => bucketType === BucketType.hard);

  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-white px-20 py-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <Typography as="h2" variant="head-m/semibold">
            Band {band}: {ladderName}
          </Typography>
          <Typography variant="body-l/medium" className="text-navy-600">
            Salary range: {ladder.salaryRange}
          </Typography>
        </div>
        <ThresholdCard threshold={ladder.threshold} />
      </div>
      <div className="flex flex-col gap-6">
        <Typography variant="body-m/regular" className="text-navy-600">
          Buckets you need to complete to get on this band:
        </Typography>
        <div className="flex flex-col gap-4">
          <Typography variant="hint/caps-medium" className="text-navy-600">
            Hard skills
          </Typography>
          <div className="flex flex-col gap-6">
            {hardSkills.map((bucket: LadderBandBucket) => (
              <BucketCard
                bucket={bucket}
                key={bucket.bucketSlug}
                withLevel
                href={`${routes.mySpace.index}/${bucket.bucketSlug}`}
              />
            ))}
          </div>
        </div>
        {softSkills.length > 0 && (
          <div className="flex flex-col gap-4">
            <Typography variant="hint/caps-medium" className="text-navy-600">
              Soft skills
            </Typography>
            <div className="flex flex-col gap-6">
              {softSkills.map((bucket: LadderBandBucket) => (
                <BucketCard
                  bucket={bucket}
                  key={bucket.bucketSlug}
                  href={`${routes.mySpace.index}/${bucket.bucketSlug}`}
                  withStatus
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
