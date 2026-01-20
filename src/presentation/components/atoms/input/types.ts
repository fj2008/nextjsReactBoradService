// src/presentation/components/atoms/input/types.ts
import { InputHTMLAttributes } from 'react';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 입력 필드 크기 */
  size?: InputSize;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}