// src/application/hooks/api/post/useGetPosts.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPosts } from '@infrastructure/api/post';
import { GetPostsRequest, GetPostsResponse } from '@infrastructure/api/post/types';
import { postKeys } from './keys';

/**
 * 게시글 목록 조회 Hook
 *
 * @param params - 조회 파라미터 (page, limit, keyword)
 * @returns Query 결과 (data, isLoading, error 등)
 *
 * @example
 * const { data, isLoading } = useGetPosts({ page: 1, limit: 10 });
 */
export const useGetPosts = (
  params?: GetPostsRequest
): UseQueryResult<GetPostsResponse> => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => getPosts(params),
  });
};