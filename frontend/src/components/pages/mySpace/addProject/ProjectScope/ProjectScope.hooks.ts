import { Option } from '@app/types/common';
import { ProjectScopeProps } from './ProjectScope.interface';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { AddProjectForm, addProjectFormNames } from '../AddProjectFormProvider/AddProjectFormProvider.interface';
import { AdvancementLevel, AtomicSkill } from '@app/types/library';

export const useProjectScope = (bands: ProjectScopeProps['bands']) => {
  const [advancementLevels, setAdvancementLevels] = useState<AdvancementLevel[]>([]);
  const { watch, setValue, control } = useFormContext<AddProjectForm>();
  const selectedSkills = useWatch({
    name: addProjectFormNames.skills,
    control,
  });
  const selectedBucket = watch(addProjectFormNames.bucket);
  const [levelOpen, setLevelOpen] = useState<null | number>(null);

  const handleOpenLevel = (level: null | number) => {
    setLevelOpen((prev) => (prev === level ? null : level));
  };

  const availableBuckets = useMemo(() => {
    return bands.flatMap((band) => {
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
  }, [bands]);

  useEffect(() => {
    const bucketAdvancementLevels = bands.reduce((acc, curr) => {
      const bucket = curr.buckets.find((bucket) => bucket.bucketSlug === selectedBucket.id);
      return bucket ? [...acc, ...bucket.advancementLevels] : acc;
    }, [] as AdvancementLevel[]);

    setAdvancementLevels(bucketAdvancementLevels);
  }, [selectedBucket, availableBuckets, bands]);

  const handleSelectAll = (checkboxName: string, selected: boolean, skills?: AtomicSkill[]) => {
    skills?.forEach(({ skillId }) => {
      setValue(`${checkboxName}.${skillId}` as `${typeof addProjectFormNames.skills}.1.1`, {
        id: skillId.toString(),
        selected: selected,
      });
    });
  };

  // INFO: Handle 'select all' checkbox states based on state of other checkboxes
  useEffect(() => {
    const selectedSkillsArr = Object.values(selectedSkills);

    selectedSkillsArr.forEach((skillLevel, i) => {
      const { all, ...rest } = skillLevel;

      const anyUnselected = Object.values(rest).some((level) => !level || (level && !level.selected));
      if (all && all?.selected && anyUnselected) {
        setValue(`skills.${i + 1}.all`, { id: 'all', selected: false });
      } else if (!all?.selected && !anyUnselected) {
        setValue(`skills.${i + 1}.all`, { id: 'all', selected: true });
      }
    });
  }, [selectedSkills, setValue]);

  return {
    availableBuckets,
    advancementLevels,
    levelOpen,
    handleOpenLevel,
    handleSelectAll,
  };
};
