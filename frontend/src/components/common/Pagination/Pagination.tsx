import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { PaginationProps } from './Pagination.interface';
import { paginationMaxPages, rowsPerPage } from '@app/const';
import { generateClassNames } from '@app/utils';

export const Pagination = ({ itemsAmount, setPageNumber, pageNumber }: PaginationProps) => {
  const pagesButtons = itemsAmount && [...Array(Math.ceil(itemsAmount / rowsPerPage))];

  const getResultsNumber = (position?: string) => {
    if (position === 'start') return pageNumber * rowsPerPage - rowsPerPage + 1;

    return itemsAmount && pageNumber * rowsPerPage > itemsAmount
      ? (itemsAmount % rowsPerPage) + (pageNumber * rowsPerPage - rowsPerPage)
      : pageNumber * rowsPerPage;
  };

  // TO REFACTOR
  const getPageNumber = (index: number) => {
    // return pagesButtons && pagesButtons?.length > paginationMaxPages
    //   ? (pageNumber <= startPagesWithoutTruncation && index + 1 === paginationMaxPages - 1) ||
    //     (pageNumber >= pagesButtons.length - 2 && index + 1 === 2)
    //     ? '...'
    //     : pageNumber <= startPagesWithoutTruncation && index + 1 <= startPagesWithoutTruncation
    //       ? index + 1
    //       : pageNumber >= pagesButtons.length - 2 && index + 1 >= startPagesWithoutTruncation
    //         ? pagesButtons.length - (paginationMaxPages - (index + 1))
    //         : index + 1 === paginationMaxPages
    //           ? pagesButtons.length
    //           : (pagePosition === startPagesWithoutTruncation + 1 &&
    //                 pageNumber > startPagesWithoutTruncation + 1 &&
    //                 index + 1 === 2) ||
    //               (pagePosition === startPagesWithoutTruncation + 2 &&
    //                 pageNumber > startPagesWithoutTruncation + 2 &&
    //                 index + 1 === 2) ||
    //               (pagePosition === startPagesWithoutTruncation + 1 &&
    //                 pageNumber < pagesButtons.length - 4 &&
    //                 index + 1 === paginationMaxPages - 1) ||
    //               (pagePosition === startPagesWithoutTruncation + 2 &&
    //                 pageNumber < pagesButtons.length - 3 &&
    //                 index + 1 === paginationMaxPages - 1)
    //             ? '...'
    //             : pagePosition === 6 &&
    //                 pageNumber !== pagesButtons.length - 2 &&
    //                 index + 1 <= pagePosition &&
    //                 index + 1 >= startPagesWithoutTruncation
    //               ? pageNumber + (index + 1 - pageNumber + 1)
    //               : index + 1
    //   : index + 1;
    return index + 1;
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
          <ChevronRightIcon
            className={generateClassNames('h-6 w-6 rotate-180 text-navy-600', {
              'cursor-not-allowed text-navy-300': pageNumber === 1,
            })}
            aria-hidden="true"
          />
        </button>
        <div className="flex text-sm font-medium text-navy-600 *:flex *:h-11 *:w-11 *:items-center *:justify-center *:rounded-full *:border *:border-white *:px-5">
          {pagesButtons &&
            pagesButtons.map((_, index) => {
              if (index + 1 <= paginationMaxPages) {
                return (
                  <button
                    key={index + 1}
                    data-position={index + 1}
                    data-page={getPageNumber(index)}
                    {...(pageNumber === index + 1 && {
                      className: 'bg-blue-100 text-blue-900 [&]:border-blue-800',
                    })}
                    onClick={pageNumber !== index + 1 ? setPageNumber : undefined}
                  >
                    {getPageNumber(index)}
                  </button>
                );
              }
            })}
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center"
          onClick={(e) => pagesButtons && pageNumber !== pagesButtons.length && setPageNumber(e, ++pageNumber)}
        >
          <ChevronRightIcon
            className={generateClassNames('h-6 w-6 text-navy-600', {
              'cursor-not-allowed text-navy-300': pagesButtons && pageNumber === pagesButtons.length,
            })}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};
