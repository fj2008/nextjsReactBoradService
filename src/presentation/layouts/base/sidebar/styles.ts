// src/presentation/layouts/base/sidebar/styles.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface SidebarWrapperProps {
  $isOpen: boolean;
}

export const SidebarWrapper = styled.aside<SidebarWrapperProps>`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform ${({ theme }) => theme.transitions.normal};
  overflow-y: auto;

  /* 닫힌 상태 */
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      transform: translateX(-100%);
      position: absolute;
    `}
`;

export const MenuList = styled.nav`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

interface MenuItemButtonProps {
  $isActive: boolean;
}

export const MenuItemButton = styled.button<MenuItemButtonProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: left;
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.neutral[600]};
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  /* 활성 상태 */
  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      background-color: ${theme.colors.primary[50]};
      color: ${theme.colors.primary[600]};

      &:hover {
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[700]};
      }
    `}
`;

export const MenuIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  width: 24px;
  text-align: center;
`;

export const MenuLabel = styled.span``;

export const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[400]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;