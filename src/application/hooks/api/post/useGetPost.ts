// src/application/hooks/api/post/useGetPost.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPost } from '@infrastructure/api/post';
import { GetPostResponse } from '@infrastructure/api/post/types';
import { postKeys } from './keys';

/**
 * 게시글 상세 조회 Hook
 *
 * @param id - 게시글 ID
 * @returns Query 결과
 *
 * @example
 * const { data, isLoading } = useGetPost(1);
 */
export const useGetPost = (
  id: number
): UseQueryResult<GetPostResponse> => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    // id가 유효할 때만 쿼리 실행
    enabled: id > 0,
  });
};