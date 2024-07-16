import { Option } from '@app/components/common/Combobox';

export const peopleTableFormName = {
  search: 'search',
  band: 'band',
} as const;

export interface PeopleTableForm {
  [peopleTableFormName.band]: Option;
  [peopleTableFormName.search]: string;
}
