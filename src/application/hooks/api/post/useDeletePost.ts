// src/application/hooks/api/post/useDeletePost.ts
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { deletePost } from '@infrastructure/api/post';
import { DeletePostResponse } from '@infrastructure/api/post/types';
import { postKeys } from './keys';

/**
 * 게시글 삭제 Hook
 *
 * @returns Mutation 결과
 *
 * @example
 * const { mutate } = useDeletePost();
 * mutate(1); // ID 1번 게시글 삭제
 */
export const useDeletePost = (): UseMutationResult<
  DeletePostResponse,
  Error,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: (_, deletedId) => {
      // 해당 게시글 상세 캐시 제거
      queryClient.removeQueries({
        queryKey: postKeys.detail(deletedId),
      });
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};