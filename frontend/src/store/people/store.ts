import { routes } from '@app/constants';
import { create } from 'zustand';
import { PeopleState } from './interfaces';

const initialState: PeopleState = {
  progress: {
    [routes.people.addNew.personalDetails]: 'notStarted',
    [routes.people.addNew.mainLadder]: 'notStarted',
  },
  updateProgress: () => {},
};

const usePeopleStore = create<PeopleState>()((set) => ({
  ...initialState,
  updateProgress: (newProgress) => set((state) => ({ progress: { ...state.progress, ...newProgress } })),
}));

export { usePeopleStore };
