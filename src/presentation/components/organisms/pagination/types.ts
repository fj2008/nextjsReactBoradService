// src/presentation/components/organisms/pagination/types.ts
export interface PaginationProps {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 한 번에 보여줄 페이지 버튼 수 */
  pageRangeDisplayed?: number;
}