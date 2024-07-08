import { PropsWithChildren, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { generateClassNames } from '@app/utils';
import { AccordionCardProps } from './AccordionCard.interface';
import { Typography } from '@app/components/common/Typography';

export const AccordionCard = ({
  title,
  children,
  expandedByDefault,
  className,
  small,
}: PropsWithChildren<AccordionCardProps>) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (expandedByDefault) {
      setOpen(true);
    }
  }, [expandedByDefault]);

  return (
    <div className={className}>
      <button
        type="button"
        className={generateClassNames(
          'group flex w-full items-center justify-between rounded-2xl border border-navy-200 p-6',
          {
            'hover:bg-transparent rounded-b-none border-b-0 pb-0': isOpen,
            'cursor-auto': !children,
          },
        )}
        onClick={() => setOpen(!isOpen)}
      >
        <Typography variant={small ? 'body-m/semibold' : 'head-s/semibold'}>{title}</Typography>
        {children ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 group-hover:bg-white">
            <ChevronRightIcon
              className={generateClassNames('rotate-90 text-navy-500 transition', { '-rotate-90': isOpen })}
            />
          </div>
        ) : undefined}
      </button>
      {children ? (
        <div className={generateClassNames('rounded-b-2xl border border-t-0 border-navy-200 p-6', { hidden: !isOpen })}>
          {children}
        </div>
      ) : undefined}
    </div>
  );
};
