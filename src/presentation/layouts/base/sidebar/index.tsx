// src/presentation/layouts/base/sidebar/index.tsx
import React, { useCallback } from 'react';
import {
  SidebarWrapper,
  SidebarHeader,
  SidebarTitle,
  MenuList,
  MenuItemButton,
  MenuIcon,
  MenuLabel,
} from './styles';
import { SidebarProps, MenuItem } from './types';

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  currentPath,
  isOpen,
  onMenuClick,
}) => {
  const handleMenuClick = useCallback(
    (item: MenuItem): void => {
      onMenuClick?.(item);
    },
    [onMenuClick]
  );

  return (
    <SidebarWrapper $isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>메뉴</SidebarTitle>
      </SidebarHeader>

      <MenuList>
        {menuItems.map((item) => (
          <MenuItemButton
            key={item.id}
            $isActive={currentPath === item.href}
            onClick={() => handleMenuClick(item)}
          >
            {item.icon && <MenuIcon>{item.icon}</MenuIcon>}
            <MenuLabel>{item.label}</MenuLabel>
          </MenuItemButton>
        ))}
      </MenuList>
    </SidebarWrapper>
  );
};

export type { SidebarProps, MenuItem } from './types';