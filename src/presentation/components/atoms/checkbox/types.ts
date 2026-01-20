// src/presentation/components/atoms/checkbox/types.ts
import { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 체크박스 라벨 */
  label?: ReactNode;
  /** 에러 상태 */
  error?: boolean;
}