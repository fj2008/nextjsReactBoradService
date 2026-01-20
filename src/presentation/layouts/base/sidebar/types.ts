// src/presentation/layouts/base/sidebar/types.ts
export interface MenuItem {
  /** 메뉴 고유 ID */
  id: string;
  /** 메뉴 라벨 */
  label: string;
  /** 이동할 경로 */
  href: string;
  /** 아이콘 (이모지 또는 텍스트) */
  icon?: string;
}

export interface SidebarProps {
  /** 메뉴 목록 */
  menuItems: MenuItem[];
  /** 현재 활성 경로 */
  currentPath: string;
  /** 사이드바 열림 상태 */
  isOpen: boolean;
  /** 메뉴 클릭 핸들러 */
  onMenuClick?: (item: MenuItem) => void;
}