// src/presentation/components/atoms/checkbox/styles.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  user-select: none;

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface StyledCheckboxProps {
  $error: boolean;
}

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const StyledCheckbox = styled.span<StyledCheckboxProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.white};
  transition: all ${({ theme }) => theme.transitions.fast};

  /* 에러 상태 */
  ${({ theme, $error }) =>
    $error &&
    css`
      border-color: ${theme.colors.error[500]};
    `}

  /* 체크 아이콘 */
  &::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(0);
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  /* 체크된 상태 */
  ${HiddenCheckbox}:checked + & {
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-color: ${({ theme }) => theme.colors.primary[500]};

    &::after {
      transform: rotate(45deg) scale(1);
    }
  }

  /* 포커스 상태 */
  ${HiddenCheckbox}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* 호버 상태 */
  ${CheckboxWrapper}:hover ${HiddenCheckbox}:not(:disabled) + & {
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

export const CheckboxLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[700]};
`;