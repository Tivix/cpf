import {LadderDetailsProps} from "@app/components/modules/LadderDetails/LadderDetails.interface";
import {InfoIcon} from "@app/static/icons/InfoIcon";
import {Bucket} from "@app/types/common";
import {BucketCard} from "@app/components/common/BucketCard";

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
          <div className="rounded-xl border border-[#E5E6EA] p-4 flex flex-col items-center">
              <div className="flex gap-2 justify-between">
                  <p>Threshold</p>
                  <InfoIcon />
              </div>
              <p className="text-2xl">{ladder.threshold}</p>
          </div>
      </div>
        <div>
            <p className="text-m text-navy-600">Buckets you need to complete to get on this band:</p>
            <p className="text-sm text-navy-600 uppercase">Hard skills</p>
            {ladder.buckets.map((bucket: Bucket) => (
                <BucketCard bucket={bucket} />
            ))}
        </div>
    </div>
  );
};
