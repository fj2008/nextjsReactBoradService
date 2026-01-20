// src/presentation/layouts/base/layout/index.tsx
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../header';
import { Sidebar, MenuItem } from '../sidebar';
import {
  LayoutWrapper,
  LayoutBody,
  ContentWrapper,
} from './styles';
import { BaseLayoutProps } from './types';

// 기본 메뉴 항목
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: '홈', href: '/', icon: '🏠' },
  { id: 'posts', label: '게시판', href: '/posts', icon: '📋' },
  { id: 'write', label: '글쓰기', href: '/posts/write', icon: '✏️' },
];

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  menuItems = DEFAULT_MENU_ITEMS,
  userName = '사용자',
}) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 사이드바 토글
  const handleMenuToggle = useCallback((): void => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // 메뉴 클릭 시 페이지 이동
  const handleMenuClick = useCallback(
    (item: MenuItem): void => {
      router.push(item.href);
    },
    [router]
  );

  return (
    <LayoutWrapper>
      {/* 상단 헤더 */}
      <Header onMenuClick={handleMenuToggle} userName={userName} />

      <LayoutBody>
        {/* 좌측 사이드바 */}
        <Sidebar
          menuItems={menuItems}
          currentPath={router.pathname}
          isOpen={isSidebarOpen}
          onMenuClick={handleMenuClick}
        />

        {/* 메인 콘텐츠 영역 */}
        <ContentWrapper $sidebarOpen={isSidebarOpen}>
          {children}
        </ContentWrapper>
      </LayoutBody>
    </LayoutWrapper>
  );
};

export type { BaseLayoutProps } from './types';