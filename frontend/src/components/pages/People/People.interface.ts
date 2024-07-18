import { Option } from '@app/types/common';

export const peopleTableFormName = {
  search: 'search',
  band: 'band',
} as const;

export interface PeopleTableForm {
  [peopleTableFormName.band]: Option;
  [peopleTableFormName.search]: string;
}
