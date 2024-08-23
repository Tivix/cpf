import { Option } from '@app/types/common';
import { Employee } from '../../People.interface';
import { userStatus } from '@app/types/user';

export interface PeopleTableProps {
  people: Employee[];
  currentTab?: Option<keyof typeof userStatus>;
}
