import { AtomicSkill } from '@app/types/library';

export interface Skill {
  name: string;
  description?: string;
}

export interface SkillCategories {
  [categoryName: string]: Skill[];
}

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
