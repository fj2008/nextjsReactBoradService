// src/presentation/components/atoms/label/types.ts
import { LabelHTMLAttributes, ReactNode } from 'react';

export type LabelSize = 'sm' | 'base' | 'lg' | 'xl';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** 라벨 텍스트 */
  children: ReactNode;
  /** 폰트 크기 */
  size?: LabelSize;
  /** 필수 항목 여부 */
  required?: boolean;
  /** 비활성화 스타일 */
  disabled?: boolean;
}