import { Tooltip } from 'react-tooltip';
import { LadderDetailsProps } from '@app/components/modules/LadderDetails/LadderDetails.interface';
import { InfoIcon } from '@app/static/icons/InfoIcon';
import { LadderBandBucket } from '@app/types/library';
import { BucketCard } from '@app/components/common/BucketCard';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Typography } from '@app/components/common/Typography';

export const LadderDetails = ({ ladder, ladderName, band, ladderSlug }: LadderDetailsProps) => {
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
        <div className="flex flex-col items-center rounded-xl border border-navy-200 p-4">
          <div className="flex justify-between gap-2">
            <Typography variant="body-m/medium" className="text-navy-600">
              Threshold
            </Typography>
            <InfoIcon
              className="text-navy-600"
              data-tooltip-id="threshold-info-tooltip"
              data-tooltip-content="Min. points needed to complete band"
              data-tooltip-place="top"
            />
            <Tooltip id="threshold-info-tooltip" />
          </div>
          <Typography variant="head-m/bold">{ladder.threshold}</Typography>
        </div>
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
            {ladder.hardSkillBuckets.map((bucket: LadderBandBucket) => (
              <BucketCard bucket={bucket} key={bucket.bucketSlug} ladderSlug={ladderSlug} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Typography variant="hint/caps-medium" className="text-navy-600">
            Soft skills
          </Typography>
          <div className="flex flex-col gap-6">
            <AccordionCard title="Time management">
              <div className="flex flex-col gap-6">
                <AccordionList
                  items={ladder.softSkillBuckets.map(({ description, bucketName }) => ({
                    key: bucketName,
                    title: bucketName,
                    children: description ? <p>{description}</p> : undefined,
                  }))}
                />
              </div>
            </AccordionCard>
          </div>
        </div>
      </div>
    </div>
  );
};
