// src/pages/posts/[id]/index.tsx
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { useGetPost, useDeletePost } from '@hooks/api';
import { useToast } from '@hooks/common';

export default function PostDetail(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const postId = Number(id);

  const { showSuccess, showError } = useToast();

  // 데이터 조회
  const { data, isLoading, isError } = useGetPost(postId);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  // 날짜 포맷팅
  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 목록으로 이동
  const handleBackClick = useCallback((): void => {
    router.push('/posts');
  }, [router]);

  // 수정 페이지로 이동
  const handleEditClick = useCallback((): void => {
    router.push(`/posts/${postId}/edit`);
  }, [router, postId]);

  // 삭제
  const handleDeleteClick = useCallback((): void => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deletePost(postId, {
        onSuccess: (response) => {
          showSuccess(response.message);
          router.push('/posts');
        },
        onError: (error) => {
          showError(`삭제 실패: ${error.message}`);
        },
      });
    }
  }, [deletePost, postId, router, showSuccess, showError]);

  // 로딩 상태
  if (isLoading) {
    return (
      <BaseLayout userName="홍길동">
        <LoadingMessage>게시글을 불러오는 중...</LoadingMessage>
      </BaseLayout>
    );
  }

  // 에러 상태
  if (isError || !data) {
    return (
      <BaseLayout userName="홍길동">
        <ErrorMessage>
          <p>게시글을 찾을 수 없습니다.</p>
          <Button variant="secondary" onClick={handleBackClick}>
            목록으로
          </Button>
        </ErrorMessage>
      </BaseLayout>
    );
  }

  const { post } = data;

  return (
    <BaseLayout userName="홍길동">
      {/* 상단 버튼 영역 */}
      <TopActions>
        <Button variant="ghost" onClick={handleBackClick}>
          ← 목록으로
        </Button>
      </TopActions>

      {/* 게시글 카드 */}
      <PostCard>
        {/* 헤더 */}
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostMeta>
            <MetaItem>
              <MetaLabel>작성자</MetaLabel>
              <MetaValue>{post.author}</MetaValue>
            </MetaItem>
            <MetaDivider />
            <MetaItem>
              <MetaLabel>작성일</MetaLabel>
              <MetaValue>{formatDateTime(post.createdAt)}</MetaValue>
            </MetaItem>
            {post.updatedAt !== post.createdAt && (
              <>
                <MetaDivider />
                <MetaItem>
                  <MetaLabel>수정일</MetaLabel>
                  <MetaValue>{formatDateTime(post.updatedAt)}</MetaValue>
                </MetaItem>
              </>
            )}
            <MetaDivider />
            <MetaItem>
              <MetaLabel>조회수</MetaLabel>
              <MetaValue>{post.views.toLocaleString()}</MetaValue>
            </MetaItem>
          </PostMeta>
        </PostHeader>

        {/* 본문 */}
        <PostContent>{post.content}</PostContent>

        {/* 하단 버튼 영역 */}
        <PostActions>
          <Button variant="secondary" onClick={handleEditClick}>
            수정
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteClick}
            isLoading={isDeleting}
          >
            삭제
          </Button>
        </PostActions>
      </PostCard>
    </BaseLayout>
  );
}

// Styled Components
const TopActions = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const PostCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  max-width: 900px;
`;

const PostHeader = styled.header`
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PostTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const MetaLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const MetaValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MetaDivider = styled.span`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

const PostContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.neutral[700]};
  white-space: pre-wrap;
  min-height: 200px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

const LoadingMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.error[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;