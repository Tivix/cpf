'use client';
import { usePeopleStore } from '@app/store/peopleStore';
import { SideStepper, Step, StepStates } from '../SideStepper';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const addEmployeeInitialSteps: Step[] = [
  { label: '1. Personal details', state: 'notStarted', current: true, href: '/personal-details' },
  { label: '2. Main ladder', state: 'notStarted', current: false, href: '/main-ladder' },
];

export const EmployeeSideStepper = () => {
  const progress = usePeopleStore((state) => state.progress);
  const pathname = usePathname();
  const [addEmployeeSteps, setAddEmployeeSteps] = useState(addEmployeeInitialSteps);

  // INFO: If current step is not already 'completed', then set 'inProgress' state to the current path
  useEffect(() => {
    setAddEmployeeSteps((prevState) =>
      prevState.map((step) => {
        const state: StepStates =
          progress[step.href] !== 'completed' && pathname.endsWith(step.href) ? 'inProgress' : progress[step.href];

        return {
          ...step,
          state: state,
        };
      }),
    );
  }, [pathname, progress]);

  return <SideStepper steps={addEmployeeSteps} />;
};
