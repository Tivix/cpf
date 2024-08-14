import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { Typography } from '@app/components/common/Typography';
import { ExpandableSectionProps } from '@app/components/common/ExpandableSection/ExpandableSection.interface';
import { FC, PropsWithChildren } from 'react';

export const ExpandableSection: FC<PropsWithChildren<ExpandableSectionProps>> = ({
  onClick,
  open,
  title,
  description,
  verticalLine,
  children,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="relative flex flex-col items-center">
        <button
          className="mb-2 mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-800 hover:opacity-50"
          onClick={onClick}
        >
          <ChevronRightIcon className={`h-3.5 w-3.5 text-white ${!open ? 'rotate-90' : '-rotate-90'}`} />
        </button>
        {verticalLine && <div className="absolute left-3 top-12 h-[calc(100%-40px)] w-[1.5px] bg-blue-800" />}
      </div>
      <div className="mb-4 ml-4 flex w-full flex-col gap-4">
        <button
          className={`flex w-full cursor-pointer flex-col gap-4 rounded-lg ${!open && 'hover:bg-navy-50'}`}
          onClick={onClick}
        >
          <Typography as="h3" variant="body-l/semibold">
            {title}
          </Typography>
          {description && (
            <Typography variant="body-m/regular" className="text-navy-600">
              {description}
            </Typography>
          )}
        </button>
        {open && children}
      </div>
    </div>
  );
};
