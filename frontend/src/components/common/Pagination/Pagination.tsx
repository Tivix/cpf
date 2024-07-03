import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { PaginationProps } from './Pagination.interface';
import { rowsPerPage } from '@app/const';

export const Pagination = ({ itemsAmount, setPageNumber, pageNumber }: PaginationProps) => {
  const numberOfPages = itemsAmount && [...Array(Math.ceil(itemsAmount / rowsPerPage))];

  const getResultsNumber = (position?: string) => {
    if (position === 'start') return pageNumber * rowsPerPage - rowsPerPage + 1;

    return itemsAmount && pageNumber * rowsPerPage > itemsAmount
      ? (itemsAmount % rowsPerPage) + (pageNumber * rowsPerPage - rowsPerPage)
      : pageNumber * rowsPerPage;
  };

  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm text-navy-600 *:font-semibold">
        Showing
        <span> {getResultsNumber('start')} </span>
        to
        <span> {getResultsNumber()} </span>
        of
        <span> {itemsAmount} </span>
        results
      </p>

      <div className="flex items-center gap-2">
        <button
          className="flex h-11 w-11 items-center justify-center"
          onClick={(e) => pageNumber !== 1 && setPageNumber(e, --pageNumber)}
        >
          <ChevronRightIcon className="h-6 w-6 rotate-180 text-navy-600" aria-hidden="true" />
        </button>
        <div className="flex text-sm font-medium text-navy-600 *:flex *:h-11 *:w-11 *:items-center *:justify-center *:rounded-full *:border *:border-white *:px-5">
          {numberOfPages &&
            numberOfPages.map((_, index) => (
              <button
                key={index}
                value={index + 1}
                {...(pageNumber === index + 1 && {
                  className: 'bg-blue-100 text-blue-900 [&]:border-blue-800',
                })}
                onClick={setPageNumber}
              >
                {index + 1}
              </button>
            ))}
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center"
          onClick={(e) => numberOfPages && pageNumber !== numberOfPages.length && setPageNumber(e, ++pageNumber)}
        >
          <ChevronRightIcon className="h-6 w-6 text-navy-600" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
