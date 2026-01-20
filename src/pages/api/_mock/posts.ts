// src/pages/api/_mock/posts.ts
import { Post } from '@infrastructure/api/post/types';

/**
 * Mock 게시글 데이터
 */
export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Next.js 시작하기',
    content: 'Next.js는 React 기반의 풀스택 프레임워크입니다. SSR, SSG, ISR 등 다양한 렌더링 방식을 지원합니다.',
    author: '홍길동',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    views: 150,
  },
  {
    id: 2,
    title: 'React Hooks 완벽 가이드',
    content: 'useState, useEffect, useCallback, useMemo 등 React Hooks의 모든 것을 알아봅니다.',
    author: '김철수',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    views: 289,
  },
  {
    id: 3,
    title: 'TypeScript 기초부터 실전까지',
    content: '타입 시스템의 기초부터 제네릭, 유틸리티 타입까지 TypeScript의 핵심을 다룹니다.',
    author: '이영희',
    createdAt: '2024-01-13T11:00:00Z',
    updatedAt: '2024-01-13T15:20:00Z',
    views: 567,
  },
  {
    id: 4,
    title: 'Emotion으로 CSS-in-JS 마스터하기',
    content: 'Emotion 라이브러리를 사용한 스타일링 방법과 테마 시스템 구축 방법을 알아봅니다.',
    author: '박민수',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    views: 198,
  },
  {
    id: 5,
    title: 'TanStack Query로 서버 상태 관리하기',
    content: 'React Query(TanStack Query)를 사용한 효율적인 서버 상태 관리 방법을 배웁니다.',
    author: '최지은',
    createdAt: '2024-01-11T10:15:00Z',
    updatedAt: '2024-01-11T10:15:00Z',
    views: 423,
  },
  {
    id: 6,
    title: 'Zustand 상태 관리 입문',
    content: '가볍고 간단한 상태 관리 라이브러리 Zustand의 사용법을 알아봅니다.',
    author: '정다운',
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-10T08:30:00Z',
    views: 312,
  },
  {
    id: 7,
    title: 'Clean Architecture in Frontend',
    content: '프론트엔드에서 Clean Architecture를 적용하는 방법과 폴더 구조를 설명합니다.',
    author: '강미래',
    createdAt: '2024-01-09T13:20:00Z',
    updatedAt: '2024-01-09T13:20:00Z',
    views: 645,
  },
  {
    id: 8,
    title: '테스트 주도 개발(TDD) with React',
    content: 'React 컴포넌트를 테스트하는 방법과 TDD 방식의 개발 프로세스를 다룹니다.',
    author: '윤희망',
    createdAt: '2024-01-08T17:00:00Z',
    updatedAt: '2024-01-08T17:00:00Z',
    views: 234,
  },
  {
    id: 9,
    title: 'Atomic Design 패턴 적용하기',
    content: 'Atoms, Molecules, Organisms 등 Atomic Design 패턴을 실제 프로젝트에 적용합니다.',
    author: '송행복',
    createdAt: '2024-01-07T09:45:00Z',
    updatedAt: '2024-01-07T09:45:00Z',
    views: 178,
  },
  {
    id: 10,
    title: 'Next.js API Routes 활용법',
    content: 'Next.js의 API Routes를 사용하여 백엔드 API를 구축하는 방법을 설명합니다.',
    author: '홍길동',
    createdAt: '2024-01-06T14:10:00Z',
    updatedAt: '2024-01-06T14:10:00Z',
    views: 389,
  },
  {
    id: 11,
    title: 'React Hook Form으로 폼 관리하기',
    content: 'React Hook Form을 사용한 효율적인 폼 상태 관리와 유효성 검증 방법입니다.',
    author: '김철수',
    createdAt: '2024-01-05T11:30:00Z',
    updatedAt: '2024-01-05T11:30:00Z',
    views: 267,
  },
  {
    id: 12,
    title: '프론트엔드 성능 최적화',
    content: 'React 앱의 성능을 최적화하는 다양한 기법들을 소개합니다.',
    author: '이영희',
    createdAt: '2024-01-04T15:55:00Z',
    updatedAt: '2024-01-04T15:55:00Z',
    views: 512,
  },
];

// ID로 게시글 찾기
export const findPostById = (id: number): Post | undefined => {
  return mockPosts.find((post) => post.id === id);
};

// 다음 ID 생성
export const getNextId = (): number => {
  return Math.max(...mockPosts.map((p) => p.id)) + 1;
};