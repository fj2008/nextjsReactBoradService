// src/presentation/components/organisms/table/types.ts
import { ReactNode } from 'react';

export interface TableColumn<T> {
  /** 컬럼 고유 키 */
  key: string;
  /** 컬럼 헤더 텍스트 */
  header: string;
  /** 컬럼 너비 (px 또는 %) */
  width?: string;
  /** 데이터 렌더링 함수 */
  render?: (row: T, index: number) => ReactNode;
  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  /** 테이블 컬럼 정의 */
  columns: TableColumn<T>[];
  /** 테이블 데이터 */
  data: T[];
  /** 행 클릭 핸들러 */
  onRowClick?: (row: T, index: number) => void;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 데이터 없음 메시지 */
  emptyMessage?: string;
  /** 행의 고유 키를 반환하는 함수 */
  rowKey: (row: T) => string | number;
}