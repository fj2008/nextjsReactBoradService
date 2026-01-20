// src/presentation/components/atoms/input/index.tsx
import React, { forwardRef } from 'react';
import { InputWrapper, StyledInput, ErrorMessage } from './styles';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      error = false,
      errorMessage,
      fullWidth = false,
      ...rest
    },
    ref
  ) => {
    return (
      <InputWrapper $fullWidth={fullWidth}>
        <StyledInput
          ref={ref}
          $size={size}
          $error={error || !!errorMessage}
          $fullWidth={fullWidth}
          {...rest}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export type { InputProps, InputSize } from './types';