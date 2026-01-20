// src/presentation/components/atoms/button/styles.ts
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { ButtonVariant, ButtonSize } from './types';

// 버튼 변형별 스타일
const getVariantStyles = (theme: Theme, variant: ButtonVariant) => {
  const variants = {
    primary: css`
      background-color: ${theme.colors.primary[500]};
      color: ${theme.colors.white};
      border: 1px solid ${theme.colors.primary[500]};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary[600]};
        border-color: ${theme.colors.primary[600]};
      }

      &:active:not(:disabled) {
        background-color: ${theme.colors.primary[700]};
        border-color: ${theme.colors.primary[700]};
      }
    `,
    secondary: css`
      background-color: ${theme.colors.neutral[100]};
      color: ${theme.colors.neutral[700]};
      border: 1px solid ${theme.colors.neutral[200]};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.neutral[200]};
      }

      &:active:not(:disabled) {
        background-color: ${theme.colors.neutral[300]};
      }
    `,
    outline: css`
      background-color: transparent;
      color: ${theme.colors.primary[600]};
      border: 1px solid ${theme.colors.primary[500]};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary[50]};
      }

      &:active:not(:disabled) {
        background-color: ${theme.colors.primary[100]};
      }
    `,
    ghost: css`
      background-color: transparent;
      color: ${theme.colors.neutral[600]};
      border: 1px solid transparent;

      &:hover:not(:disabled) {
        background-color: ${theme.colors.neutral[100]};
      }

      &:active:not(:disabled) {
        background-color: ${theme.colors.neutral[200]};
      }
    `,
    danger: css`
      background-color: ${theme.colors.error[500]};
      color: ${theme.colors.white};
      border: 1px solid ${theme.colors.error[500]};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.error[600]};
        border-color: ${theme.colors.error[600]};
      }

      &:active:not(:disabled) {
        background-color: ${theme.colors.error[600]};
      }
    `,
  };

  return variants[variant];
};

// 버튼 크기별 스타일
const getSizeStyles = (theme: Theme, size: ButtonSize) => {
  const sizes = {
    small: css`
      padding: ${theme.spacing[1]} ${theme.spacing[3]};
      font-size: ${theme.typography.fontSize.sm};
      border-radius: ${theme.borderRadius.sm};
    `,
    medium: css`
      padding: ${theme.spacing[2]} ${theme.spacing[4]};
      font-size: ${theme.typography.fontSize.base};
      border-radius: ${theme.borderRadius.base};
    `,
    large: css`
      padding: ${theme.spacing[3]} ${theme.spacing[6]};
      font-size: ${theme.typography.fontSize.lg};
      border-radius: ${theme.borderRadius.md};
    `,
  };

  return sizes[size];
};

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  /* 기본 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  /* 변형 스타일 */
  ${({ theme, $variant }) => getVariantStyles(theme, $variant)}

  /* 크기 스타일 */
  ${({ theme, $size }) => getSizeStyles(theme, $size)}

  /* 전체 너비 */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  /* 비활성화 상태 */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* 로딩 상태 */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;
      opacity: 0.7;
    `}

  /* 포커스 상태 */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

// 로딩 스피너
export const Spinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;