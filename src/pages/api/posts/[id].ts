// src/pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockPosts } from '../_mock/posts';
import { Post } from '@infrastructure/api/post/types';

// 메모리에 데이터 유지
let posts = [...mockPosts];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const { id } = req.query;
  const postId = parseInt(id as string, 10);

  // 응답 지연 시뮬레이션
  const delay = Math.random() * 300 + 100;

  setTimeout(() => {
    switch (req.method) {
      case 'GET':
        handleGet(postId, res);
        break;
      case 'PUT':
        handlePut(postId, req, res);
        break;
      case 'DELETE':
        handleDelete(postId, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }, delay);
}

/**
 * GET /api/posts/:id - 게시글 상세 조회
 */
function handleGet(postId: number, res: NextApiResponse): void {
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    return;
  }

  // 조회수 증가
  posts[postIndex] = {
    ...posts[postIndex],
    views: posts[postIndex].views + 1,
  };

  res.status(200).json({
    post: posts[postIndex],
  });
}

/**
 * PUT /api/posts/:id - 게시글 수정
 */
function handlePut(
  postId: number,
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    return;
  }

  const { title, content } = req.body;

  // 수정
  posts[postIndex] = {
    ...posts[postIndex],
    title: title ?? posts[postIndex].title,
    content: content ?? posts[postIndex].content,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json({
    post: posts[postIndex],
    message: '게시글이 수정되었습니다.',
  });
}

/**
 * DELETE /api/posts/:id - 게시글 삭제
 */
function handleDelete(postId: number, res: NextApiResponse): void {
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    return;
  }

  posts = posts.filter((p) => p.id !== postId);

  res.status(200).json({
    message: '게시글이 삭제되었습니다.',
  });
}