// src/presentation/components/molecules/form-field/index.tsx
import React, { forwardRef } from 'react';
import { Input, Label } from '@components/atoms';
import { FieldWrapper, LabelWrapper, HelperText } from './styles';
import { FormFieldProps } from './types';

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      helperText,
      id,
      errorMessage,
      ...inputProps
    },
    ref
  ) => {
    return (
      <FieldWrapper>
        <LabelWrapper>
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        </LabelWrapper>

        <Input
          ref={ref}
          id={id}
          errorMessage={errorMessage}
          {...inputProps}
        />

        {helperText && !errorMessage && (
          <HelperText>{helperText}</HelperText>
        )}
      </FieldWrapper>
    );
  }
);

FormField.displayName = 'FormField';

export type { FormFieldProps } from './types';