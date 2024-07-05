import { routes } from '@app/constants';
import { Step } from '../SideStepper';
import { AddNewPersonRouteKeys } from './EmployeeSideStepper.interface';

export const addEmployeeInitialSteps: Step<AddNewPersonRouteKeys>[] = [
  { label: '1. Personal details', state: 'notStarted', current: true, href: routes.people.addNew.personalDetails },
  { label: '2. Main ladder', state: 'notStarted', current: false, href: routes.people.addNew.mainLadder },
];
