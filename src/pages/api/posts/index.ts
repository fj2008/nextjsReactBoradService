// src/pages/api/posts/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockPosts, getNextId } from '../_mock/posts';
import { Post } from '@infrastructure/api/post/types';

// 메모리에 데이터 유지 (서버 재시작 시 초기화)
let posts = [...mockPosts];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  // 응답 지연 시뮬레이션 (실제 API 느낌)
  const delay = Math.random() * 500 + 200;

  setTimeout(() => {
    switch (req.method) {
      case 'GET':
        handleGet(req, res);
        break;
      case 'POST':
        handlePost(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }, delay);
}

/**
 * GET /api/posts - 게시글 목록 조회
 */
function handleGet(req: NextApiRequest, res: NextApiResponse): void {
  const { page = '1', limit = '10', keyword = '' } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const searchKeyword = (keyword as string).toLowerCase();

  // 검색 필터링
  let filteredPosts = posts;
  if (searchKeyword) {
    filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchKeyword) ||
        post.author.toLowerCase().includes(searchKeyword) ||
        post.content.toLowerCase().includes(searchKeyword)
    );
  }

  // 최신순 정렬
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // 페이지네이션
  const totalCount = sortedPosts.length;
  const totalPages = Math.ceil(totalCount / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + limitNum);

  res.status(200).json({
    posts: paginatedPosts,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalCount,
      limit: limitNum,
    },
  });
}

/**
 * POST /api/posts - 게시글 생성
 */
function handlePost(req: NextApiRequest, res: NextApiResponse): void {
  const { title, content, author } = req.body;

  // 유효성 검증
  if (!title || !content || !author) {
    res.status(400).json({ message: '제목, 내용, 작성자는 필수입니다.' });
    return;
  }

  const now = new Date().toISOString();
  const newPost: Post = {
    id: getNextId(),
    title,
    content,
    author,
    createdAt: now,
    updatedAt: now,
    views: 0,
  };

  // 배열 앞에 추가 (최신글)
  posts = [newPost, ...posts];

  res.status(201).json({
    post: newPost,
    message: '게시글이 등록되었습니다.',
  });
}