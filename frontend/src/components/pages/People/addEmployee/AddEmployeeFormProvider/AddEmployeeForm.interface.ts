import { Option } from '@app/types/common';

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

export const addEmployeeFirstStepFields = [
  addEmployeeFormNames.firstName,
  addEmployeeFormNames.lastName,
  addEmployeeFormNames.email,
] as const;
