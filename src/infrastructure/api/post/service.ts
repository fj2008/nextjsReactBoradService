// src/infrastructure/api/post/service.ts
import { apiClient } from '@infrastructure/client';
import {
  GetPostsRequest,
  GetPostsResponse,
  GetPostResponse,
  CreatePostRequest,
  CreatePostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
  DeletePostResponse,
} from './types';

/**
 * 게시글 목록 조회
 */
export const getPosts = async (
  params?: GetPostsRequest
): Promise<GetPostsResponse> => {
  const response = await apiClient.get<GetPostsResponse>('/posts', {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      keyword: params?.keyword ?? '',
    },
  });
  return response.data;
};

/**
 * 게시글 상세 조회
 */
export const getPost = async (id: number): Promise<GetPostResponse> => {
  const response = await apiClient.get<GetPostResponse>(`/posts/${id}`);
  return response.data;
};

/**
 * 게시글 생성
 */
export const createPost = async (
  data: CreatePostRequest
): Promise<CreatePostResponse> => {
  const response = await apiClient.post<CreatePostResponse>('/posts', data);
  return response.data;
};

/**
 * 게시글 수정
 */
export const updatePost = async (
  id: number,
  data: UpdatePostRequest
): Promise<UpdatePostResponse> => {
  const response = await apiClient.put<UpdatePostResponse>(`/posts/${id}`, data);
  return response.data;
};

/**
 * 게시글 삭제
 */
export const deletePost = async (id: number): Promise<DeletePostResponse> => {
  const response = await apiClient.delete<DeletePostResponse>(`/posts/${id}`);
  return response.data;
};