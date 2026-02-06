// src/presentation/layouts/base/layout/index.tsx
import type { ReactElement } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import type { MenuItem } from '../sidebar/types';
import type { BaseLayoutProps } from './types';
import { LayoutWrapper, LayoutBody, ContentWrapper } from './styles';

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: '홈', href: '/', icon: '🏠' },
  { id: 'posts', label: '게시판', href: '/posts', icon: '📋' },
  { id: 'write', label: '글쓰기', href: '/posts/write', icon: '✏️' },
  { id: 'api-test', label: 'API 테스트', href: '/api-test', icon: '🧪' },
];

export const BaseLayout = ({
  children,
  menuItems = DEFAULT_MENU_ITEMS,
  userName,
}: BaseLayoutProps): ReactElement => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentPath = useMemo(() => router.asPath.split('?')[0], [router.asPath]);

  const handleMenuToggle = useCallback((): void => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleMenuClick = useCallback(
    (item: MenuItem): void => {
      router.push(item.href);
    },
    [router]
  );

  return (
    <LayoutWrapper>
      <Header onMenuClick={handleMenuToggle} userName={userName} />
      <LayoutBody>
        <Sidebar
          menuItems={menuItems}
          currentPath={currentPath}
          isOpen={isSidebarOpen}
          onMenuClick={handleMenuClick}
        />
        <ContentWrapper $sidebarOpen={isSidebarOpen}>{children}</ContentWrapper>
      </LayoutBody>
    </LayoutWrapper>
  );
};

export type { BaseLayoutProps } from './types';