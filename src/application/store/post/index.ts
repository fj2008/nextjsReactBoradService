// src/application/store/post/index.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 게시글 필터 상태
 */
interface PostFilterState {
  // 상태
  keyword: string;
  page: number;
  limit: number;

  // 액션
  setKeyword: (keyword: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilter: () => void;
}

const initialState = {
  keyword: '',
  page: 1,
  limit: 10,
};

/**
 * 게시글 필터 스토어
 *
 * @example
 * const { keyword, setKeyword, page, setPage } = usePostFilterStore();
 */
export const usePostFilterStore = create<PostFilterState>()(
  devtools(
    (set) => ({
      ...initialState,

      setKeyword: (keyword) =>
        set(
          { keyword, page: 1 }, // 검색 시 첫 페이지로
          false,
          'setKeyword'
        ),

      setPage: (page) =>
        set(
          { page },
          false,
          'setPage'
        ),

      setLimit: (limit) =>
        set(
          { limit, page: 1 }, // limit 변경 시 첫 페이지로
          false,
          'setLimit'
        ),

      resetFilter: () =>
        set(
          initialState,
          false,
          'resetFilter'
        ),
    }),
    { name: 'PostFilterStore' }
  )
);