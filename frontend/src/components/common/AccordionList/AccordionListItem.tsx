import { PropsWithChildren, useState } from 'react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { generateClassNames } from '@app/utils';
import { AccordionListItemProps } from './AccordionList.interface';
import { Typography } from '@app/components/common/Typography';
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
      <div className={generateClassNames('flex w-full items-center justify-between', { 'cursor-auto': !children })}>
        <Tooltip tooltipText={noContentTooltipText} onClick={handleClick}>
          <div className="flex w-full items-center justify-between">
            <Typography variant="body-m/medium" className="text-left text-navy-600">
              {title}
            </Typography>
            <div
              className={`flex min-h-10 min-w-10 cursor-pointer items-center justify-center ${disableExpand ? 'text-navy-300' : 'text-navy-500'}`}
            >
              <ChevronRightIcon className={generateClassNames('rotate-90', { '-rotate-90': isOpen })} />
            </div>
          </div>
        </Tooltip>
      </div>
      {children ? (
        <div className={`font-normal text-navy-600 duration-300 ${isOpen ? 'mt-4 h-auto text-sm' : 'h-0 text-[0px]'}`}>
          {children}
        </div>
      ) : undefined}
    </div>
  );
};
