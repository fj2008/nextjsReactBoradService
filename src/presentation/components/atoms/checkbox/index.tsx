// src/presentation/components/atoms/checkbox/index.tsx
import React, { forwardRef } from 'react';
import {
  CheckboxWrapper,
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxLabel,
} from './styles';
import { CheckboxProps } from './types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, className, ...rest }, ref) => {
    return (
      <CheckboxWrapper className={className}>
        <HiddenCheckbox ref={ref} type="checkbox" {...rest} />
        <StyledCheckbox $error={error} />
        {label && <CheckboxLabel>{label}</CheckboxLabel>}
      </CheckboxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps } from './types';