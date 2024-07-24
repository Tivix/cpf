import { AdvancementLevel } from '@app/types/library';

export interface AdvancementLevelProps {
  data: AdvancementLevel;
  showVerticalLine: boolean;
  open: boolean;
  onClick: () => void;
}
