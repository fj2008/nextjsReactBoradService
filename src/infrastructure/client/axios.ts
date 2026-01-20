// src/infrastructure/client/axios.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * API 에러 응답 형식
 */
interface ApiErrorResponse {
  message: string;
  code?: string;
}

/**
 * Axios 인스턴스 생성
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000, // 10초
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 토큰이 있으면 헤더에 추가 (실제 프로젝트에서는 NextAuth 등 사용)
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('accessToken') 
        : null;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 요청 로깅 (개발 환경)
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      // 응답 로깅 (개발 환경)
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ [API Response] ${response.config.url}`, response.data);
      }

      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      // 에러 로깅
      console.error(`❌ [API Error] ${error.config?.url}`, error.response?.data);

      // HTTP 상태 코드별 에러 처리
      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 401:
            // 인증 실패 - 로그인 페이지로 이동
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
              window.location.href = '/login';
            }
            break;

          case 403:
            // 권한 없음
            console.error('접근 권한이 없습니다.');
            break;

          case 404:
            // 리소스 없음
            console.error('요청한 리소스를 찾을 수 없습니다.');
            break;

          case 500:
            // 서버 에러
            console.error('서버 오류가 발생했습니다.');
            break;

          default:
            console.error(`HTTP Error: ${status}`);
        }
      } else if (error.request) {
        // 요청은 보냈으나 응답 없음 (네트워크 에러)
        console.error('네트워크 연결을 확인해주세요.');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// 싱글톤 인스턴스
export const apiClient = createAxiosInstance();

export default apiClient;