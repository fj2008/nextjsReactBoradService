// src/presentation/components/organisms/table/index.tsx
import type { ReactElement, ReactNode } from 'react';
import { useCallback } from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyRow,
  EmptyCell,
  LoadingCell,
} from './styles';
import { TableProps, TableColumn } from './types';

export const Table = <T,>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = '데이터가 없습니다.',
  rowKey,
}: TableProps<T>): ReactElement => {
  const handleRowClick = useCallback(
    (row: T, index: number): void => {
      onRowClick?.(row, index);
    },
    [onRowClick]
  );

  // 셀 내용 렌더링
  const renderCellContent = (
    column: TableColumn<T>,
    row: T,
    index: number
  ): ReactNode => {
    if (column.render) {
      return column.render(row, index);
    }

    // key를 사용해 객체에서 값 추출
    const value = (row as Record<string, unknown>)[column.key];

    if (value === null || value === undefined) {
      return '-';
    }

    return String(value);
  };

  return (
    <TableWrapper>
      <StyledTable>
        {/* 테이블 헤더 */}
        <TableHead>
          <tr>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                $align={column.align}
                $width={column.width}
              >
                {column.header}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHead>

        {/* 테이블 바디 */}
        <TableBody>
          {/* 로딩 상태 */}
          {isLoading && (
            <EmptyRow>
              <LoadingCell colSpan={columns.length}>
                로딩 중...
              </LoadingCell>
            </EmptyRow>
          )}

          {/* 데이터 없음 */}
          {!isLoading && data.length === 0 && (
            <EmptyRow>
              <EmptyCell colSpan={columns.length}>{emptyMessage}</EmptyCell>
            </EmptyRow>
          )}

          {/* 데이터 행 */}
          {!isLoading &&
            data.map((row, index) => (
              <TableRow
                key={rowKey(row)}
                $clickable={!!onRowClick}
                onClick={() => handleRowClick(row, index)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    $align={column.align}
                    $width={column.width}
                  >
                    {renderCellContent(column, row, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};

export type { TableProps, TableColumn } from './types';