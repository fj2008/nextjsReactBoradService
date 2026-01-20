// src/presentation/components/molecules/search-bar/types.ts
export interface SearchBarProps {
  /** 검색어 값 */
  value: string;
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void;
  /** 검색 실행 핸들러 */
  onSearch: (value: string) => void;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
}