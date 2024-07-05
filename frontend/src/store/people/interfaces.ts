import { AddNewPersonRouteKeys } from '@app/components/modules/EmployeeSideStepper';
import { StepStates } from '@app/components/modules/SideStepper';

export type Progress = Record<AddNewPersonRouteKeys, StepStates>;

export interface PeopleState {
  progress: Progress;
  updateProgress: (newProgress: Partial<Progress>) => void;
}
