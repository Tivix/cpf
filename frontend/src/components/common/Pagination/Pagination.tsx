import { FC } from 'react';
import { Listbox } from '../Listbox';
import { Typography } from '../Typography';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { PaginationProps } from './Pagination.interface';
import { rowsPresets } from './Pagination.utils';

const ChevronButton = ({
  onClick,
  disabled,
  className = '',
  isLeft = false,
}: {
  onClick: () => void;
  disabled: boolean;
  className?: string;
  isLeft?: boolean;
}) => (
  <ChevronRightIcon
    onClick={!disabled ? onClick : () => null}
    className={`${isLeft ? 'rotate-180' : ''} ${disabled ? '' : 'cursor-pointer'} ${className}`}
    color={disabled ? 'darkgray' : ''}
  />
);

const PageNumber = ({
  index,
  currentPage,
  onPageChange,
}: {
  index: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => (
  <div
    onClick={() => onPageChange(index + 1)}
    className={`${
      index + 1 === currentPage
        ? 'cursor-pointer rounded-full border border-blue-800 bg-blue-200 p-2 px-4 text-blue-800'
        : 'cursor-pointer p-2 px-4'
    }`}
  >
    {index + 1}
  </div>
);

export const Pagination: FC<PaginationProps> = ({ pagesAmount, currentPage, onPageChange }) => {
  const renderPageNumbers = () =>
    Array.from({ length: pagesAmount }, (_, index) => (
      <PageNumber key={index} index={index} currentPage={currentPage} onPageChange={onPageChange} />
    ));

  return (
    <div className="bg-black flex w-[100%] items-center justify-between">
      <div className="flex items-center gap-4">
        <Typography variant="body-s/regular" className="no-wrap text-nowrap text-navy-600">
          Rows per page
        </Typography>
        <Listbox
          showClearButton={false}
          options={rowsPresets}
          name="rows"
          className="bg-white-200 border-y-1 border-l-1 max-w-[140px] rounded-e-xl border border-navy-200"
        />
      </div>
      <div className="flex items-center">
        <ChevronButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} isLeft={true} />
        <div className="mx-4 flex items-center">{renderPageNumbers()}</div>
        <ChevronButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= pagesAmount} />
      </div>
    </div>
  );
};
