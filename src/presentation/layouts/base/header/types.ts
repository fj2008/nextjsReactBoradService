// src/presentation/layouts/base/header/types.ts
export interface HeaderProps {
  /** 사이드바 토글 함수 */
  onMenuClick?: () => void;
  /** 현재 사용자 이름 */
  userName?: string;
}