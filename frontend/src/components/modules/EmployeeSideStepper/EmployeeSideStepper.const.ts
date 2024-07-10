import { routes } from '@app/constants';
import { Step } from '../SideStepper';
import { AddNewPersonRouteKeys } from './EmployeeSideStepper.interface';

export const addEmployeeInitialSteps: Step<AddNewPersonRouteKeys>[] = [
  { label: '1. Personal details', state: 'notStarted', active: true, href: routes.people.addNew.personalDetails },
  { label: '2. Main ladder', state: 'notStarted', active: false, href: routes.people.addNew.mainLadder },
];
