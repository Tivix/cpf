export type StepStates = 'completed' | 'inProgress' | 'notStarted';

export interface Step {
  label: string;
  state: StepStates;
  active: boolean;
}

export interface StepperProps {
  steps: Step[];
}
