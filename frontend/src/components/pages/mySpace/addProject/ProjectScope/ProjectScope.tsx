'use client';

import { Combobox } from '@app/components/common/Combobox';
import { Typography } from '@app/components/common/Typography';
import { addProjectFormNames } from '../AddProjectFormProvider/AddProjectFormProvider.interface';
import { FC } from 'react';
import { ProjectScopeProps } from './ProjectScope.interface';
import { Option } from '@app/types/common';

export const ProjectScope: FC<ProjectScopeProps> = ({ bands }) => {
  //   INFO: when user completed buckets will be available from api, disable completed options

  const availableBuckets = bands.flatMap((band) => {
    const bandLevel: Option = {
      name: `Band ${band.bandNumber}`.toUpperCase(),
      id: band.bandNumber,
      available: false,
    };
    const bandBuckets = band.buckets.map((bucket) => ({
      name: bucket.bucketName,
      id: bucket.bucketSlug,
      available: true,
    }));
    return [bandLevel, ...bandBuckets];
  });

  return (
    <>
      <Typography variant="head-m/semibold" className="mb-6">
        Project scope
      </Typography>
      <div className="flex flex-col gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8">
        <Combobox
          sort={false}
          className="w-1/2"
          label="Select bucket"
          options={availableBuckets}
          name={addProjectFormNames.bucket}
        />
      </div>
    </>
  );
};
