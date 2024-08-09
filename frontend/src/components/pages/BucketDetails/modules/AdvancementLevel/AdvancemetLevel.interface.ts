import { AdvancementLevel } from '@app/types/library';

export interface AdvancementLevelProps {
  data: AdvancementLevel;
  showVerticalLine: boolean;
  open: boolean;
  onClick: () => void;
}

export interface Skill {
  name: string;
  description?: string;
}

export interface SkillCategories {
  [categoryName: string]: Skill[];
}
