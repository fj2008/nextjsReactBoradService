// src/presentation/components/atoms/button/index.tsx
import React from 'react';
import { StyledButton, Spinner } from './styles';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Spinner />}
      {children}
    </StyledButton>
  );
};

// 타입도 함께 export
export type { ButtonProps, ButtonVariant, ButtonSize } from './types';