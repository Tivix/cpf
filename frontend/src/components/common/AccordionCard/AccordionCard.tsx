import { PropsWithChildren, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { generateClassNames } from '@app/utils';
import { AccordionCardProps } from './AccordionCard.interface';
import { Typography } from '@app/components/common/Typography';
import { Checkbox } from '../Checkbox';
import { addProjectFormNames } from '@app/components/pages/mySpace/addProject/AddProjectFormProvider/AddProjectFormProvider.interface';

export const AccordionCard = ({
  title,
  children,
  expandedByDefault,
  className,
  small,
  checkboxName,
  handleSelectAll,
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
            'rounded-b-none border-b-0 pb-0 hover:bg-transparent': isOpen,
            'cursor-auto': !children,
          },
        )}
        onClick={() => setOpen(!isOpen)}
      >
        <div className="flex flex-col items-start gap-y-8">
          <Typography variant={small ? 'body-m/semibold' : 'head-s/semibold'}>{title}</Typography>
          {checkboxName && handleSelectAll && (
            <div className="flex gap-x-4">
              <Checkbox
                handleChange={(_, selected) => handleSelectAll(checkboxName, selected)}
                name={`${checkboxName}.all` as typeof addProjectFormNames.skills}
                id="all"
              />
              <Typography variant="body-m/semibold" className="text-navy-700">
                Select all
              </Typography>
            </div>
          )}
        </div>
        {children ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 group-hover:bg-white">
            <ChevronRightIcon
              className={generateClassNames('rotate-90 text-navy-500 transition', { '-rotate-90': isOpen })}
            />
          </div>
        ) : undefined}
      </button>
      {children ? (
        <div
          className={generateClassNames('rounded-b-2xl border border-t-0 border-navy-200 px-8 py-4', {
            hidden: !isOpen,
          })}
        >
          {children}
        </div>
      ) : undefined}
    </div>
  );
};
