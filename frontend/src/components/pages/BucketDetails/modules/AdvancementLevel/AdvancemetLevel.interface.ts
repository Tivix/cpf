import { AdvancementLevel, AtomicSkill } from '@app/types/library';

export interface AdvancementLevelProps {
  data: AdvancementLevel;
  verticalLine: boolean;
  open: boolean;
  onClick: () => void;
  checkboxName?: string;
  handleSelectAll?: (name: string, selected: boolean, skills?: AtomicSkill[]) => void;
}
