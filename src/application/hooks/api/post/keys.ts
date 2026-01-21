// src/application/hooks/api/post/keys.ts
import { GetPostsRequest } from '@infrastructure/api/post/types';

/**
 * 게시글 관련 Query Keys
 *
 * 계층 구조:
 * - posts.all: 모든 게시글 관련 쿼리
 * - posts.lists: 목록 쿼리들
 * - posts.list(params): 특정 파라미터의 목록 쿼리
 * - posts.details: 상세 쿼리들
 * - posts.detail(id): 특정 ID의 상세 쿼리
 */
export const postKeys = {
  // 최상위 키
  all: ['posts'] as const,

  // 목록 관련
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: GetPostsRequest) => [...postKeys.lists(), params] as const,

  // 상세 관련
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

/**
 * Query Key 사용 예시:
 *
 * postKeys.all           → ['posts']
 * postKeys.lists()       → ['posts', 'list']
 * postKeys.list({page:1}) → ['posts', 'list', {page:1}]
 * postKeys.details()     → ['posts', 'detail']
 * postKeys.detail(1)     → ['posts', 'detail', 1]
 *
 * 무효화 예시:
 * queryClient.invalidateQueries({ queryKey: postKeys.all })
 *   → 모든 게시글 관련 쿼리 무효화
 *
 * queryClient.invalidateQueries({ queryKey: postKeys.lists() })
 *   → 목록 쿼리만 무효화 (상세는 유지)
 */