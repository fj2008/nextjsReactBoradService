// src/presentation/components/molecules/form-field/types.ts
import { InputProps } from '@components/atoms';
import { ReactNode } from 'react';

export interface FormFieldProps extends InputProps {
  /** 필드 라벨 */
  label: string;
  /** 필수 항목 여부 */
  required?: boolean;
  /** 도움말 텍스트 */
  helperText?: ReactNode;
  /** 필드 ID (label과 input 연결) */
  id: string;
}