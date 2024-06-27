import { PropsWithChildren, useState } from 'react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { generateClassNames } from '@app/utils';
import { AccordionListItemProps } from './AccordionList.interface';

export const AccordionListItem = ({ title, children }: PropsWithChildren<AccordionListItemProps>) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="border-b border-b-navy-200 px-2 py-4">
      <h3>
        <button
          type="button"
          className={generateClassNames('flex w-full items-center justify-between', { 'cursor-auto': !children })}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="text-left text-base font-medium text-navy-600">{title}</span>
          <div className="flex min-h-10 min-w-10 items-center justify-center">
            {children ? (
              <ChevronRightIcon className={generateClassNames('rotate-90 text-navy-500', { '-rotate-90': isOpen })} />
            ) : undefined}
          </div>
        </button>
      </h3>
      {children ? (
        <div className={generateClassNames('mt-4 text-sm font-normal text-navy-600', { hidden: !isOpen })}>
          {children}
        </div>
      ) : undefined}
    </div>
  );
};
