import { generateClassNames } from '@app/utils';
import { SideStepperProps } from './SideStepper.interface';
import { Fragment } from 'react';
import { Typography } from '@app/components/common/Typography';
import { stepComponentsMap } from './SideStepper.utils';

export const SideStepper = <T extends string>({ steps }: SideStepperProps<T>) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        {steps.map(({ label, state, active }, i) => {
          const last = i === steps.length - 1;
          return (
            <Fragment key={label}>
              <div className="flex items-center gap-x-3">
                {stepComponentsMap[state]}
                <Typography
                  variant="body-m/semibold"
                  className={generateClassNames(active ? 'text-navy-900' : 'text-navy-600')}
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
