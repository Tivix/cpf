import { routes } from '@app/constants';
import { Step } from '../SideStepper';
import { AddProjectRouteKeys } from './ProjectSideStepper.interface';

export const addProjectInitialSteps: Step<AddProjectRouteKeys>[] = [
  { label: '1. Project details', state: 'notStarted', active: true, href: routes.mySpace.addNew.projectDetails },
  { label: '2. Project scope', state: 'notStarted', active: false, href: routes.mySpace.addNew.scope },
];
