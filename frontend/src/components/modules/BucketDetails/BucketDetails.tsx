'use client';
import { BucketDetailsProps } from './BucketDetails.interface';
import {AdvancementLevel} from "@app/components/modules/AdvancementLevel";

export const BucketDetails: React.FC<BucketDetailsProps> = ({ data }) => {
  const { bucketName, description, advancementLevels } = data;

  return (
      <section className="py-16">
        <div className="rounded-2xl mx-28 bg-white px-20 py-12 flex flex-col gap-8">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-navy-900">
                {bucketName}
              </h2>
              <p className="text-base text-navy-600 tracking-wide">{description}</p>
            </div>
          </div>
          <div className="flex flex-col">
            {advancementLevels.map((level, index) => (
                <AdvancementLevel data={level} showVerticalLine={index < advancementLevels.length - 1} />
            ))}
          </div>
        </div>
      </section>
  );
};
