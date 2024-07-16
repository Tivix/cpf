import { Option } from '@app/components/common/Combobox';

export const addEmployeeFormNames = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  ladder: 'ladder',
  technology: 'technology',
} as const;

export interface AddEmployeeForm {
  [addEmployeeFormNames.firstName]: string;
  [addEmployeeFormNames.lastName]: string;
  [addEmployeeFormNames.email]: string;
  [addEmployeeFormNames.ladder]: Option;
  [addEmployeeFormNames.technology]: Option[];
}
