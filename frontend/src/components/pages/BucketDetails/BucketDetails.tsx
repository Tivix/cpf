'use client';
import { BucketDetailsProps } from './BucketDetails.interface';
import { AdvancementLevel } from '@app/components/modules/AdvancementLevel';
import { Typography } from '@app/components/common/Typography';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { useBucketDetails } from './BucketDetails.hooks';
import { routes } from '@app/constants';

export const BucketDetails: React.FC<BucketDetailsProps> = ({ data, ladderName, ladderSlug, bucketSlug }) => {
  const { bucketName, description, advancementLevels } = data;
  const { levelOpen, handleOpen } = useBucketDetails();

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: routes.library.index, current: false },
          { label: ladderName, href: `${routes.library.index}/${ladderSlug}`, current: false },
          { label: data.bucketName, href: `${routes.library.index}/${ladderSlug}/${bucketSlug}`, current: true },
        ]}
      />
      <section className="py-16">
        <div className="mx-28 flex flex-col gap-8 rounded-2xl bg-white px-20 py-12">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <Typography variant="head-m/semibold" as="h2">
                {bucketName}
              </Typography>
              <Typography variant="body-m/regular" className="text-navy-600">
                {description}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col">
            {advancementLevels.map((level, index) => (
              <AdvancementLevel
                key={level.advancementLevel}
                data={level}
                showVerticalLine={index < advancementLevels.length - 1}
                open={levelOpen === level.advancementLevel}
                onClick={() => handleOpen(level.advancementLevel)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
