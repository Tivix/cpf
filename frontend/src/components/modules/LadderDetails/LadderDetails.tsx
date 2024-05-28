import { Tooltip } from 'react-tooltip';
import { LadderDetailsProps } from '@app/components/modules/LadderDetails/LadderDetails.interface';
import { InfoIcon } from '@app/static/icons/InfoIcon';
import { LadderBandBucket } from '@app/types/common';
import { BucketCard } from '@app/components/common/BucketCard';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';

export const LadderDetails = ({ ladder, ladderName, band }: LadderDetailsProps) => {
  return (
    <div className="rounded-2xl bg-white px-20 py-12 flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-navy-900">
            Band {band}: {ladderName}
          </h2>
          <p className="text-navy-600 text-l font-medium">Salary range: {ladder.salaryRange}</p>
        </div>
        <div className="rounded-xl border border-navy-200 p-4 flex flex-col items-center">
          <div className="flex gap-2 justify-between text-navy-600">
            <p>Threshold</p>
            <InfoIcon
              className="text-navy-600"
              data-tooltip-id="threshold-info-tooltip"
              data-tooltip-content="Min. points needed to complete band"
              data-tooltip-place="top"
            />
            <Tooltip id="threshold-info-tooltip" />
          </div>
          <p className="text-2xl font-bold">{ladder.threshold}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-base text-navy-600 tracking-wide">Buckets you need to complete to get on this band:</p>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-navy-600 uppercase tracking-wide">Hard skills</p>
          <div className="flex flex-col gap-6">
            {ladder.hardSkillBuckets.map((bucket: LadderBandBucket) => (
              <BucketCard bucket={bucket} key={bucket.bucketSlug} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-navy-600 uppercase tracking-wide">Soft skills</p>
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