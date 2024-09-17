'use client';

import { Combobox } from '@app/components/common/Combobox';
import { Typography } from '@app/components/common/Typography';
import { addProjectFormNames } from '../AddProjectFormProvider/AddProjectFormProvider.interface';
import { FC } from 'react';
import { ProjectScopeProps } from './ProjectScope.interface';
import { useProjectScope } from './ProjectScope.hooks';
import { AdvancementLevel } from '@app/components/pages/BucketDetails/modules/AdvancementLevel';

export const ProjectScope: FC<ProjectScopeProps> = ({ bands }) => {
  const { availableBuckets, advancementLevels, handleOpenLevel, levelOpen, handleSelectAll } = useProjectScope(bands);

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
        <div className="flex flex-col">
          {advancementLevels?.map((level, index) => (
            <AdvancementLevel
              key={level.advancementLevel}
              data={level}
              verticalLine={index < advancementLevels.length - 1}
              open={levelOpen === level.advancementLevel}
              onClick={() => handleOpenLevel(level.advancementLevel)}
              checkboxName={`${addProjectFormNames.skills}.${level.advancementLevel}`}
              handleSelectAll={handleSelectAll}
            />
          ))}
        </div>
      </div>
    </>
  );
};
