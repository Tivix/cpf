import { StepStates } from '@app/components/modules/SideStepper';
import { create } from 'zustand';

interface PeopleState {
  progress: Record<string, StepStates>;
  updateProgress: (newProgress: Record<string, StepStates>) => void;
}

const initialState: PeopleState = {
  progress: {
    '/personal-details': 'notStarted',
    '/main-ladder': 'notStarted',
  },
  updateProgress: () => {},
};

const usePeopleStore = create<PeopleState>()((set) => ({
  ...initialState,
  updateProgress: (newProgress: Record<string, StepStates>) =>
    set((state) => {
      return { progress: { ...state.progress, ...newProgress } };
    }),
}));

export { usePeopleStore };
