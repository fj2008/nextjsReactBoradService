// src/presentation/styles/emotion.d.ts
import '@emotion/react';
import { Theme as CustomTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
