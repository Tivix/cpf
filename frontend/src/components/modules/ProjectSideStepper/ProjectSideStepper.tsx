'use client';
import { SideStepper, StepStates } from '../SideStepper';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AddProjectRouteKeys } from './ProjectSideStepper.interface';
import { addProjectInitialSteps } from './ProjectSideStepper.const';
import { useMySpaceStore } from '@app/store/mySpace';

export const ProjectSideStepper = () => {
  const progress = useMySpaceStore((state) => state.progress);
  const pathname = usePathname();
  const [addProjectSteps, setAddProjectSteps] = useState(addProjectInitialSteps);

  useEffect(() => {
    setAddProjectSteps((prevState) =>
      prevState.map((step) => {
        const active = pathname.endsWith(step.href);
        // INFO: If current step is not 'completed', then set 'inProgress' state to the current path
        const state: StepStates =
          progress[step.href] !== 'completed' && pathname.endsWith(step.href) ? 'inProgress' : progress[step.href];

        return {
          ...step,
          state,
          active,
        };
      }),
    );
  }, [pathname, progress]);

  return <SideStepper<AddProjectRouteKeys> steps={addProjectSteps} />;
};
