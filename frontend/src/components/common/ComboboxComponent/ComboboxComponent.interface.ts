import { Employee } from '@app/types/common';

export interface ComboboxComponentProps {
  people?: Employee[];
  setSearchedPerson: (person: Employee[]) => void;
}
