import { Option } from '@app/components/common/Combobox';

export const MainLadderFormNames = {
  ladder: 'ladder',
  technology: 'technology',
} as const;

export interface MainLadderForm {
  [MainLadderFormNames.ladder]: Option;
  [MainLadderFormNames.technology]: Option[];
}
