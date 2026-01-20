// src/presentation/components/organisms/pagination/index.tsx
import React, { useMemo, useCallback } from 'react';
import { PaginationWrapper, PageButton, Ellipsis } from './styles';
import { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageRangeDisplayed = 5,
}) => {
  // 페이지 번호 배열 생성
  const pageNumbers = useMemo((): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= pageRangeDisplayed + 2) {
      // 전체 페이지가 적으면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 복잡한 페이지네이션 로직
      const halfRange = Math.floor(pageRangeDisplayed / 2);
      let startPage = Math.max(currentPage - halfRange, 1);
      let endPage = Math.min(currentPage + halfRange, totalPages);

      // 시작/끝 조정
      if (currentPage <= halfRange + 1) {
        endPage = pageRangeDisplayed;
      } else if (currentPage >= totalPages - halfRange) {
        startPage = totalPages - pageRangeDisplayed + 1;
      }

      // 첫 페이지
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('ellipsis');
        }
      }

      // 중간 페이지들
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // 마지막 페이지
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('ellipsis');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, pageRangeDisplayed]);

  const handlePrevious = useCallback((): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback((): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback(
    (page: number): void => {
      onPageChange(page);
    },
    [onPageChange]
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationWrapper aria-label="페이지 네비게이션">
      {/* 이전 버튼 */}
      <PageButton
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        ←
      </PageButton>

      {/* 페이지 번호들 */}
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis') {
          return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
        }

        return (
          <PageButton
            key={page}
            $isActive={page === currentPage}
            onClick={() => handlePageClick(page)}
            aria-label={`${page} 페이지`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PageButton>
        );
      })}

      {/* 다음 버튼 */}
      <PageButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        →
      </PageButton>
    </PaginationWrapper>
  );
};

export type { PaginationProps } from './types';