import { AtomicSkill } from '@app/types/library';
import { SkillCategories } from '@app/components/pages/BucketDetails/modules/AdvancementLevel/AdvancemetLevel.interface';

export const getAggregatedSkills = (skills: AtomicSkill[]): SkillCategories => {
  return skills.reduce((acc, skill) => {
    return {
      ...acc,
      [skill.category]: [
        ...(acc[skill.category] ?? []),
        {
          name: skill.name,
          description: skill.description,
        },
      ],
    };
  }, {} as SkillCategories);
};
