// src/presentation/components/atoms/label/styles.ts
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { LabelSize } from './types';

const getSizeStyles = (theme: Theme, size: LabelSize) => {
  const sizes = {
    sm: css`
      font-size: ${theme.typography.fontSize.sm};
    `,
    base: css`
      font-size: ${theme.typography.fontSize.base};
    `,
    lg: css`
      font-size: ${theme.typography.fontSize.lg};
    `,
    xl: css`
      font-size: ${theme.typography.fontSize.xl};
      font-weight: ${theme.typography.fontWeight.semibold};
    `,
  };

  return sizes[size];
};

interface StyledLabelProps {
  $size: LabelSize;
  $disabled: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutral[700]};

  ${({ theme, $size }) => getSizeStyles(theme, $size)}

  ${({ theme, $disabled }) =>
    $disabled &&
    css`
      color: ${theme.colors.neutral[400]};
    `}
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.error[500]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;