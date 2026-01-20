// src/infrastructure/api/post/types.ts

/**
 * 게시글 엔티티
 */
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

/**
 * 게시글 목록 조회 요청
 */
export interface GetPostsRequest {
  page?: number;
  limit?: number;
  keyword?: string;
}

/**
 * 게시글 목록 조회 응답
 */
export interface GetPostsResponse {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
}

/**
 * 게시글 상세 조회 응답
 */
export interface GetPostResponse {
  post: Post;
}

/**
 * 게시글 생성 요청
 */
export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
}

/**
 * 게시글 생성 응답
 */
export interface CreatePostResponse {
  post: Post;
  message: string;
}

/**
 * 게시글 수정 요청
 */
export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

/**
 * 게시글 수정 응답
 */
export interface UpdatePostResponse {
  post: Post;
  message: string;
}

/**
 * 게시글 삭제 응답
 */
export interface DeletePostResponse {
  message: string;
}