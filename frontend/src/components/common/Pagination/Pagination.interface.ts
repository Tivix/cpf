import { MouseEvent } from 'react';

export interface PaginationProps {
  itemsAmount?: number;
  setPageNumber: (event: MouseEvent<HTMLButtonElement>, number?: number) => void;
  pageNumber: number;
  pagePosition: number;
}
