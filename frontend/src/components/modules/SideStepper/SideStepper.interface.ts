export type StepStates = 'completed' | 'inProgress' | 'notStarted';

export interface Step {
  label: string;
  state: StepStates;
  current: boolean;
  href: '/personal-details' | '/main-ladder';
}

export interface SideStepperProps {
  steps: Step[];
}
