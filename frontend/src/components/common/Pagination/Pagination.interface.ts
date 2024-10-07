export interface PaginationProps {
  pagesAmount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
