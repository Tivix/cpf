export type StepStates = 'completed' | 'inProgress' | 'notStarted';

export interface Step<T> {
  label: string;
  state: StepStates;
  active: boolean;
  href: T;
}

export interface SideStepperProps<T> {
  steps: Step<T>[];
}
