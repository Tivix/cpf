import { AdvancementLevel } from '@app/types/library';

export interface AdvancementLevelProps {
  data: AdvancementLevel;
  verticalLine: boolean;
  open: boolean;
  onClick: () => void;
}
