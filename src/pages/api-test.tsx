// src/pages/api-test.tsx
import type { ReactElement } from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { getPosts, getPost, createPost, updatePost, deletePost } from '@infrastructure/api';

export default function ApiTest(): ReactElement {
  const [results, setResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 결과 로깅
  const logResult = (label: string, data: unknown): void => {
    const formatted = JSON.stringify(data, null, 2);
    setResults(`[${label}]\n${formatted}`);
    console.log(label, data);
  };

  // 에러 로깅
  const logError = (label: string, error: unknown): void => {
    const message = error instanceof Error ? error.message : String(error);
    setResults(`[${label} - ERROR]\n${message}`);
    console.error(label, error);
  };

  // 테스트: 목록 조회
  const handleGetPosts = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getPosts({ page: 1, limit: 5 });
      logResult('GET /api/posts', data);
    } catch (error) {
      logError('GET /api/posts', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 테스트: 검색
  const handleSearchPosts = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getPosts({ page: 1, limit: 10, keyword: 'React' });
      logResult('GET /api/posts?keyword=React', data);
    } catch (error) {
      logError('GET /api/posts?keyword=React', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 테스트: 상세 조회
  const handleGetPost = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getPost(1);
      logResult('GET /api/posts/1', data);
    } catch (error) {
      logError('GET /api/posts/1', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 테스트: 생성
  const handleCreatePost = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await createPost({
        title: '테스트 게시글',
        content: 'API 테스트를 위한 게시글입니다.',
        author: '테스터',
      });
      logResult('POST /api/posts', data);
    } catch (error) {
      logError('POST /api/posts', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 테스트: 수정
  const handleUpdatePost = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await updatePost(1, {
        title: '수정된 제목',
        content: '수정된 내용입니다.',
      });
      logResult('PUT /api/posts/1', data);
    } catch (error) {
      logError('PUT /api/posts/1', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 테스트: 삭제
  const handleDeletePost = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await deletePost(1);
      logResult('DELETE /api/posts/1', data);
    } catch (error) {
      logError('DELETE /api/posts/1', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <BaseLayout userName="개발자">
      <Title>API 테스트</Title>
      <Description>각 버튼을 클릭하여 API 동작을 확인합니다.</Description>

      <Section>
        <SectionTitle>📋 게시글 API</SectionTitle>

        <ButtonGroup>
          <Button onClick={handleGetPosts} isLoading={isLoading}>
            목록 조회 (GET)
          </Button>
          <Button onClick={handleSearchPosts} isLoading={isLoading}>
            검색 (keyword=React)
          </Button>
          <Button onClick={handleGetPost} isLoading={isLoading}>
            상세 조회 (ID: 1)
          </Button>
          <Button variant="primary" onClick={handleCreatePost} isLoading={isLoading}>
            생성 (POST)
          </Button>
          <Button variant="secondary" onClick={handleUpdatePost} isLoading={isLoading}>
            수정 (PUT)
          </Button>
          <Button variant="danger" onClick={handleDeletePost} isLoading={isLoading}>
            삭제 (DELETE)
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <SectionTitle>📄 결과</SectionTitle>
        <ResultBox>
          {results || '버튼을 클릭하면 결과가 여기에 표시됩니다.'}
        </ResultBox>
      </Section>
    </BaseLayout>
  );
}

// Styled Components
const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ResultBox = styled.pre`
  background: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral[100]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 200px;
  max-height: 400px;
`;
