// src/application/hooks/api/post/useCreatePost.ts
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@infrastructure/api/post';
import {
  CreatePostRequest,
  CreatePostResponse,
} from '@infrastructure/api/post/types';
import { postKeys } from './keys';

/**
 * 게시글 생성 Hook
 *
 * @returns Mutation 결과 (mutate, isLoading, error 등)
 *
 * @example
 * const { mutate, isPending } = useCreatePost();
 * mutate({ title: '제목', content: '내용', author: '작성자' });
 */
export const useCreatePost = (): UseMutationResult<
  CreatePostResponse,
  Error,
  CreatePostRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    // 성공 시 목록 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },

    // 에러 처리 (필요 시)
    onError: (error) => {
      console.error('게시글 생성 실패:', error);
    },
  });
};