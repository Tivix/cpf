import { Option } from '@app/types/common';
import { Employee } from '../../People.interface';

export interface PeopleTableProps {
  people: Employee[];
  currentTab?: Option;
}
