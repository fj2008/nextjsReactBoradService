// src/presentation/layouts/base/layout/types.ts
import { ReactNode } from 'react';
import { MenuItem } from '../sidebar/types';

export interface BaseLayoutProps {
  /** 페이지 콘텐츠 */
  children: ReactNode;
  /** 메뉴 항목들 */
  menuItems?: MenuItem[];
  /** 현재 사용자 이름 */
  userName?: string;
}