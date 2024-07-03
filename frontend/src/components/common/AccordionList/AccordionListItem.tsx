import { PropsWithChildren, useState } from 'react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { generateClassNames } from '@app/utils';
import { AccordionListItemProps } from './AccordionList.interface';
import { Tooltip } from '@app/components/common/Tooltip';

export const AccordionListItem = ({
  title,
  noContentTooltipText,
  children,
}: PropsWithChildren<AccordionListItemProps>) => {
  const [isOpen, setOpen] = useState(false);
  const disableExpand = !children;

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="border-b border-b-navy-200 px-2 py-4">
      <h3>
        <button
          type="button"
          className={generateClassNames('flex w-full items-center justify-between', { 'cursor-auto': !children })}
          onClick={disableExpand ? undefined : handleClick}
        >
          <span className="text-left text-base font-medium text-navy-600">{title}</span>
          <Tooltip tooltipText={noContentTooltipText}>
            <div
              className={`flex min-h-10 min-w-10 cursor-pointer items-center justify-center ${disableExpand ? 'text-navy-300' : 'text-navy-500'}`}
            >
              <ChevronRightIcon className={generateClassNames('rotate-90', { '-rotate-90': isOpen })} />
            </div>
          </Tooltip>
        </button>
      </h3>
      {children ? (
        <div className={`font-normal text-navy-600 duration-300 ${isOpen ? 'mt-4 h-auto text-sm' : 'h-0 text-[0px]'}`}>
          {children}
        </div>
      ) : undefined}
    </div>
  );
};
