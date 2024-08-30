import { routes } from '@app/constants';
import { create } from 'zustand';
import { MySpaceState } from './interfaces';

const initialState: MySpaceState = {
  progress: {
    [routes.mySpace.addNew.projectDetails]: 'notStarted',
    [routes.mySpace.addNew.scope]: 'notStarted',
  },
  updateProgress: () => {},
  reset: () => {},
};

const useMySpaceStore = create<MySpaceState>()((set) => ({
  ...initialState,
  updateProgress: (newProgress) => set((state) => ({ progress: { ...state.progress, ...newProgress } })),
  reset: () => set(initialState),
}));

export { useMySpaceStore };
