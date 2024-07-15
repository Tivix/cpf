import { generateClassNames } from '@app/utils';
import { SideStepperProps } from './SideStepper.interface';
import { Fragment } from 'react';
import { Typography } from '@app/components/common/Typography';
import { stepComponentsMap } from './SideStepper.utils';
import { Button } from '@app/components/common/Button';
import { useRouter } from 'next/navigation';

export const SideStepper = <T extends string>({ steps }: SideStepperProps<T>) => {
  const router = useRouter();
  return (
    <div className="flex">
      <div className="flex flex-col">
        {steps.map(({ label, state, active, href }, i) => {
          const last = i === steps.length - 1;
          return (
            <Fragment key={label}>
              <Button
                className="flex items-center justify-start gap-x-3"
                variant="link"
                disabled={state === 'notStarted'}
                onClick={() => router.push(href)}
              >
                {stepComponentsMap[state]}
                <Typography
                  variant="body-m/semibold"
                  className={generateClassNames(active ? 'text-navy-900' : 'text-navy-600')}
                >
                  {label}
                </Typography>
              </Button>
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
