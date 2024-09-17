import { LadderDetailsProps } from './LadderDetails.interface';
import { BucketType, LadderBandBucket } from '@app/types/library';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Typography } from '@app/components/common/Typography';
import { ThresholdCard } from '@app/components/modules/ThresholdCard';
import { routes } from '@app/constants';
import { BucketCard } from '@app/components/modules/BucketCard';

export const LadderDetails = ({ data, ladderName, band, ladderSlug }: LadderDetailsProps) => {
  const hardSkills = data.buckets.filter(({ bucketType }) => bucketType === BucketType.hard);
  const softSkills = data.buckets.filter(({ bucketType }) => bucketType === BucketType.soft);

  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-white px-20 py-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <Typography as="h2" variant="head-m/semibold">
            Band {band}: {ladderName}
          </Typography>
          <Typography variant="body-l/medium" className="text-navy-600">
            Salary range: {data.salaryRange}
          </Typography>
        </div>
        <ThresholdCard threshold={data.threshold} />
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
                href={`${routes.library.index}/${ladderSlug}/${bucket.bucketSlug}`}
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
              {softSkills.map(({ advancementLevels, bucketName, bucketSlug }) => (
                <AccordionCard title={bucketName} key={bucketSlug}>
                  {advancementLevels.length > 0 && (
                    <div className="flex flex-col gap-6">
                      <AccordionList
                        items={
                          advancementLevels[0].skills.map(({ description, name, skillId }) => ({
                            key: skillId.toString(),
                            title: name,
                            children: description ? <p>{description}</p> : undefined,
                          })) ?? []
                        }
                      />
                    </div>
                  )}
                </AccordionCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
