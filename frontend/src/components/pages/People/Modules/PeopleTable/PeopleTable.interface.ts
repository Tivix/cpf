import { Option } from '@app/types/common';
import { Employee, PeopleStatus } from '../../People.interface';

export interface PeopleTableProps {
  people: Employee[];
  currentTab?: Option<keyof typeof PeopleStatus>;
}
