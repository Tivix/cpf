import { BucketDetailsProps } from './BucketDetails.interface';
import { AdvancementLevel } from '@app/components/modules/AdvancementLevel';
import {Typography} from "@app/components/common/Typography";

export const BucketDetails: React.FC<BucketDetailsProps> = ({ data }) => {
  const { bucketName, description, advancementLevels } = data;

  return (
    <section className="py-16">
      <div className="mx-28 flex flex-col gap-8 rounded-2xl bg-white px-20 py-12">
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Typography variant="head-m/semibold" as="h2">{bucketName}</Typography>
            <Typography variant="body-m/regular" className="text-navy-600">{description}</Typography>
          </div>
        </div>
        <div className="flex flex-col">
          {advancementLevels.map((level, index) => (
            <AdvancementLevel
              key={level.advancementLevel}
              data={level}
              showVerticalLine={index < advancementLevels.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
