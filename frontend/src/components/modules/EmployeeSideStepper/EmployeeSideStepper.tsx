'use client';
import { SideStepper, StepStates } from '../SideStepper';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AddNewPersonRouteKeys } from './EmployeeSideStepper.interface';
import { addEmployeeInitialSteps } from './EmployeeSideStepper.const';
import { usePeopleStore } from '@app/store/people/store';

export const EmployeeSideStepper = () => {
  const progress = usePeopleStore((state) => state.progress);
  const pathname = usePathname();
  const [addEmployeeSteps, setAddEmployeeSteps] = useState(addEmployeeInitialSteps);

  useEffect(() => {
    setAddEmployeeSteps((prevState) =>
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

  return <SideStepper<AddNewPersonRouteKeys> steps={addEmployeeSteps} />;
};
