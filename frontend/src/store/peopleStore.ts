import { AddNewPersonRouteKeys } from '@app/components/modules/EmployeeSideStepper';
import { StepStates } from '@app/components/modules/SideStepper';
import { routes } from '@app/constants';
import { create } from 'zustand';

interface PeopleState {
  progress: Record<AddNewPersonRouteKeys, StepStates>;
  updateProgress: (newProgress: Record<string, StepStates>) => void;
}

const initialState: PeopleState = {
  progress: {
    [routes.people.addNew.personalDetails]: 'notStarted',
    [routes.people.addNew.mainLadder]: 'notStarted',
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
