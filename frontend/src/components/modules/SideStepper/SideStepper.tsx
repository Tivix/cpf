import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import { generateClassNames } from '@app/utils';
import { SideStepperProps, StepStates } from './SideStepper.interface';
import { Fragment } from 'react';

const Completed = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800">
      <CheckMarkIcon />
    </div>
  );
};
const InProgress = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-800 bg-white">
      <div className="h-[10px] w-[10px] rounded-full bg-blue-800" />
    </div>
  );
};
const NotStarted = () => {
  return <div className="flex h-7 w-7 items-center justify-center rounded-full border border-navy-300 bg-white" />;
};

const stepsMap: { [key in StepStates]: JSX.Element } = {
  completed: <Completed />,
  inProgress: <InProgress />,
  notStarted: <NotStarted />,
};

export const SideStepper = ({ steps }: SideStepperProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        {steps.map(({ label, state, active }, i) => {
          const isLast = i === steps.length - 1;
          return (
            <Fragment key={label}>
              <div className="flex items-center gap-x-3">
                {stepsMap[state]}
                <div
                  className={generateClassNames('font-semibold leading-6', active ? 'text-navy-900' : 'text-navy-600')}
                >
                  {label}
                </div>
              </div>
              {!isLast && (
                <div className="flex w-7 justify-center py-2">
                  <div className="flex h-[16px] w-[1.5px] border border-navy-300" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
