// src/presentation/components/atoms/label/index.tsx
import React from 'react';
import { StyledLabel, RequiredMark } from './styles';
import { LabelProps } from './types';

export const Label: React.FC<LabelProps> = ({
  children,
  size = 'base',
  required = false,
  disabled = false,
  ...rest
}) => {
  return (
    <StyledLabel $size={size} $disabled={disabled} {...rest}>
      {children}
      {required && <RequiredMark>*</RequiredMark>}
    </StyledLabel>
  );
};

export type { LabelProps, LabelSize } from './types';