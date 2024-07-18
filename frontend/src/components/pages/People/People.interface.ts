import { Option } from '@app/components/common/Combobox';

export const peopleTableFormName = {
  band: 'band',
  search: 'search',
} as const;

export interface PeopleTableForm {
  [peopleTableFormName.band]: Option | null;
  [peopleTableFormName.search]: string;
}
