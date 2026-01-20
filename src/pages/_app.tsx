// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { theme, resetStyles, globalStyles } from '@styles/index';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      {/* 전역 스타일 적용 */}
      <Global styles={resetStyles} />
      <Global styles={globalStyles} />

      {/* 페이지 컴포넌트 렌더링 */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}