'use client';

import { MySpaceBucketDetailsProps } from '@app/components/pages/MySpaceBucketDetails/MySpaceBucketDetails.interface';
import { routes } from '@app/constants';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Typography } from '@app/components/common/Typography';
import { AdvancementLevel } from './modules/AdvancementLevel';
import { useMySpaceBucketDetails } from '@app/components/pages/MySpaceBucketDetails/MySpaceBucketDetails.hooks';
import { LevelDots } from '@app/components/modules/LevelDots';

export const MySpaceBucketDetails: React.FC<MySpaceBucketDetailsProps> = ({ data }) => {
  const { bucketSlug, bucketName, description, advancementLevels } = data;
  const { levelOpen, handleOpen } = useMySpaceBucketDetails();
  const level = 2;

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'My space', href: routes.mySpace.index, current: false },
          { label: data.bucketName, href: `${routes.library.index}/${bucketSlug}`, current: true },
        ]}
      />
      <section className="mx-28 flex flex-col gap-8 rounded-2xl bg-white px-20 py-12">
        <div className="flex justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <Typography variant="head-m/semibold" as="h2">
                {bucketName}
              </Typography>
              <div className="flex flex-row items-center gap-4">
                <Typography variant="body-m/medium" className="text-navy-600">
                  Level {level}
                </Typography>
                <LevelDots level={level} />
              </div>
            </div>
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
      </section>
    </div>
  );
};
