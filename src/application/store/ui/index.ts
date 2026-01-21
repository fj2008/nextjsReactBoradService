// src/application/store/ui/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * UI 상태
 */
interface UIState {
  // 사이드바
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

/**
 * UI 스토어
 * - persist: localStorage에 상태 저장 (새로고침 유지)
 */
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,

        toggleSidebar: () =>
          set(
            (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
            false,
            'toggleSidebar'
          ),

        setSidebarOpen: (isOpen) =>
          set(
            { isSidebarOpen: isOpen },
            false,
            'setSidebarOpen'
          ),
      }),
      {
        name: 'ui-storage', // localStorage 키 이름
        partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
      }
    ),
    { name: 'UIStore' }
  )
);