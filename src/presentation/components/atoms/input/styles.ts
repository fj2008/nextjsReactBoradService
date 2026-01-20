// src/presentation/components/atoms/input/styles.ts
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { InputSize } from './types';

const getSizeStyles = (theme: Theme, size: InputSize) => {
  const sizes = {
    small: css`
      padding: ${theme.spacing[1]} ${theme.spacing[2]};
      font-size: ${theme.typography.fontSize.sm};
    `,
    medium: css`
      padding: ${theme.spacing[2]} ${theme.spacing[3]};
      font-size: ${theme.typography.fontSize.base};
    `,
    large: css`
      padding: ${theme.spacing[3]} ${theme.spacing[4]};
      font-size: ${theme.typography.fontSize.lg};
    `,
  };

  return sizes[size];
};

export const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

interface StyledInputProps {
  $size: InputSize;
  $error: boolean;
  $fullWidth: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  /* 기본 스타일 */
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.neutral[900]};
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;

  /* 크기 스타일 */
  ${({ theme, $size }) => getSizeStyles(theme, $size)}

  /* 전체 너비 */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  /* Placeholder 스타일 */
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }

  /* 포커스 상태 */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }

  /* 에러 상태 */
  ${({ theme, $error }) =>
    $error &&
    css`
      border-color: ${theme.colors.error[500]};

      &:focus {
        border-color: ${theme.colors.error[500]};
        box-shadow: 0 0 0 3px ${theme.colors.error[50]};
      }
    `}

  /* 비활성화 상태 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.error[500]};
`;