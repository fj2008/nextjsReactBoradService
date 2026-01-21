// src/providers/query/index.tsx
import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // useState로 QueryClient 생성 (SSR 대응)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 데이터가 "신선한" 상태로 유지되는 시간
            staleTime: 1000 * 60 * 5, // 5분

            // 캐시에 데이터가 유지되는 시간
            gcTime: 1000 * 60 * 30, // 30분 (구 cacheTime)

            // 윈도우 포커스 시 자동 리페치
            refetchOnWindowFocus: false,

            // 마운트 시 자동 리페치
            refetchOnMount: true,

            // 네트워크 재연결 시 자동 리페치
            refetchOnReconnect: true,

            // 재시도 횟수
            retry: 1,
          },
          mutations: {
            // 뮤테이션 재시도 안 함
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 DevTools 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
};