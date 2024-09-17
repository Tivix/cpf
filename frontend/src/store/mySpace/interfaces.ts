import { AddProjectRouteKeys } from '@app/components/modules/ProjectSideStepper';
import { StepStates } from '@app/components/modules/SideStepper';

export type Progress = Record<AddProjectRouteKeys, StepStates>;

export interface MySpaceState {
  progress: Progress;
  updateProgress: (newProgress: Partial<Progress>) => void;
  reset: () => void;
}
