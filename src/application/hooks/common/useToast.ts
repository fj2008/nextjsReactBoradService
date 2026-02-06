// src/application/hooks/common/useToast.ts
import { useCallback } from 'react';
import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface UseToastReturn {
  showToast: (message: string, type?: ToastType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

/**
 * Toast 알림 훅
 *
 * @example
 * const { showSuccess, showError } = useToast();
 * showSuccess('저장되었습니다!');
 * showError('오류가 발생했습니다.');
 */
export const useToast = (): UseToastReturn => {
  const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const showToast = useCallback(
    (message: string, type: ToastType = 'info'): void => {
      switch (type) {
        case 'success':
          toast.success(message, defaultOptions);
          break;
        case 'error':
          toast.error(message, defaultOptions);
          break;
        case 'warning':
          toast.warning(message, defaultOptions);
          break;
        case 'info':
        default:
          toast.info(message, defaultOptions);
          break;
      }
    },
    []
  );

  const showSuccess = useCallback((message: string): void => {
    toast.success(message, defaultOptions);
  }, []);

  const showError = useCallback((message: string): void => {
    toast.error(message, defaultOptions);
  }, []);

  const showWarning = useCallback((message: string): void => {
    toast.warning(message, defaultOptions);
  }, []);

  const showInfo = useCallback((message: string): void => {
    toast.info(message, defaultOptions);
  }, []);

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};