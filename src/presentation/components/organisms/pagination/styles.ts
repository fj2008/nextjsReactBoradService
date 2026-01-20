// src/presentation/components/organisms/pagination/styles.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const PaginationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

interface PageButtonProps {
  $isActive?: boolean;
  $isDisabled?: boolean;
}

export const PageButton = styled.button<PageButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    border-color: ${({ theme }) => theme.colors.neutral[300]};
  }

  /* 활성 상태 */
  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      background-color: ${theme.colors.primary[500]};
      border-color: ${theme.colors.primary[500]};
      color: ${theme.colors.white};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary[600]};
        border-color: ${theme.colors.primary[600]};
      }
    `}

  /* 비활성화 상태 */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.neutral[400]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;