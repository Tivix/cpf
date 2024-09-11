import { AtomicSkill } from '@app/types/library';

export interface SkillCategories {
  [categoryName: string]: AtomicSkill[];
}

export const getAggregatedSkills = (skills: AtomicSkill[]): SkillCategories => {
  return skills.reduce<SkillCategories>((acc, skill) => {
    return {
      ...acc,
      [skill.category]: [...(acc[skill.category] ?? []), { ...skill }],
    };
  }, {});
};
