// src/application/hooks/api/post/useUpdatePost.ts
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { updatePost } from '@infrastructure/api/post';
import {
  UpdatePostRequest,
  UpdatePostResponse,
} from '@infrastructure/api/post/types';
import { postKeys } from './keys';

interface UpdatePostVariables {
  id: number;
  data: UpdatePostRequest;
}

/**
 * 게시글 수정 Hook
 *
 * @returns Mutation 결과
 *
 * @example
 * const { mutate } = useUpdatePost();
 * mutate({ id: 1, data: { title: '수정된 제목' } });
 */
export const useUpdatePost = (): UseMutationResult<
  UpdatePostResponse,
  Error,
  UpdatePostVariables
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePost(id, data),

    onSuccess: (_, variables) => {
      // 해당 게시글 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(variables.id),
      });
      // 목록 캐시도 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};