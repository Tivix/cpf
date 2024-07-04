import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import { generateClassNames } from '@app/utils';
import { SideStepperProps, StepStates } from './SideStepper.interface';
import { Fragment } from 'react';
import { Typography } from '@app/components/common/Typography';

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

export const SideStepper = <T extends string>({ steps }: SideStepperProps<T>) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        {steps.map(({ label, state, current }, i) => {
          const last = i === steps.length - 1;
          return (
            <Fragment key={label}>
              <div className="flex items-center gap-x-3">
                {stepsMap[state]}
                <Typography
                  variant="body-m/semibold"
                  className={generateClassNames(current ? 'text-navy-900' : 'text-navy-600')}
                >
                  {label}
                </Typography>
              </div>
              {!last && (
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
