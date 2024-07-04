export type StepStates = 'completed' | 'inProgress' | 'notStarted';

export interface Step<T> {
  label: string;
  state: StepStates;
  current: boolean;
  href: T;
}

export interface SideStepperProps<T> {
  steps: Step<T>[];
}
