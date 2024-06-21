import { AdvancementLevel } from '@app/types/common';

export interface AdvancementLevelProps {
  data: AdvancementLevel;
  showVerticalLine: boolean;
}

export interface AdvancementLevelHooks {
  hideModal: () => void;
  openModal: () => void;
  toggleAccordionOpen: () => void;
  modalOpen: boolean;
  accordionOpen: boolean;
}
