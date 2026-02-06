// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { theme, resetStyles, globalStyles } from '@styles/index';
import { QueryProvider } from '@providers/query';
import { ToastProvider } from '@providers/toast';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <Global styles={resetStyles} />
        <Global styles={globalStyles} />
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}