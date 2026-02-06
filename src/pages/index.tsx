// src/pages/index.tsx
import type { ReactElement } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { useGetPosts } from '@hooks/api';

export default function Home(): ReactElement {
  const router = useRouter();
  const { data: postsData } = useGetPosts({ page: 1, limit: 5 });

  return (
    <BaseLayout userName="홍길동">
      <PageContent>
        <Title>🎉 게시판 튜토리얼</Title>
        <Description>
          Next.js + TypeScript + Emotion으로 만든 게시판입니다.
        </Description>

        {/* 통계 카드 */}
        <StatsGrid>
          <StatCard>
            <StatValue>{postsData?.pagination.totalCount ?? 0}</StatValue>
            <StatLabel>전체 게시글</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>
              {postsData?.posts.reduce((sum, post) => sum + post.views, 0) ?? 0}
            </StatValue>
            <StatLabel>총 조회수</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* 최근 게시글 */}
        <Section>
          <SectionHeader>
            <SectionTitle>📋 최근 게시글</SectionTitle>
            <Button
              variant="ghost"
              size="small"
              onClick={() => router.push('/posts')}
            >
              전체보기 →
            </Button>
          </SectionHeader>

          <PostList>
            {postsData?.posts.slice(0, 5).map((post) => (
              <PostItem
                key={post.id}
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                <PostTitle>{post.title}</PostTitle>
                <PostInfo>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>조회 {post.views}</span>
                </PostInfo>
              </PostItem>
            ))}
          </PostList>
        </Section>

        {/* 완료 단계 */}
        <Section>
          <SectionTitle>✅ 완료된 학습 단계</SectionTitle>
          <StepList>
            <StepItem $completed>1단계: 스타일링 시스템 (Emotion)</StepItem>
            <StepItem $completed>2단계: Atoms 컴포넌트</StepItem>
            <StepItem $completed>3단계: Molecules & Organisms</StepItem>
            <StepItem $completed>4단계: 레이아웃 시스템</StepItem>
            <StepItem $completed>5단계: API 레이어</StepItem>
            <StepItem $completed>6단계: 상태 관리</StepItem>
            <StepItem $completed>7단계: 게시판 완성</StepItem>
          </StepList>
        </Section>

        {/* 빠른 링크 */}
        <ButtonGroup>
          <Button variant="primary" onClick={() => router.push('/posts/write')}>
            ✏️ 글쓰기
          </Button>
          <Button variant="secondary" onClick={() => router.push('/posts')}>
            📋 게시판 보기
          </Button>
        </ButtonGroup>
      </PageContent>
    </BaseLayout>
  );
}

// Styled Components
const PageContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled.div`
  padding: ${({ theme }) => theme.spacing[3]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    margin: 0 -${({ theme }) => theme.spacing[3]};
    padding-left: ${({ theme }) => theme.spacing[3]};
    padding-right: ${({ theme }) => theme.spacing[3]};
  }
`;

const PostTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const PostInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const StepList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

interface StepItemProps {
  $completed?: boolean;
}

const StepItem = styled.li<StepItemProps>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background-color: ${({ theme, $completed }) =>
    $completed ? theme.colors.success[50] : theme.colors.neutral[50]};
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.success[600] : theme.colors.neutral[600]};

  &::before {
    content: '${({ $completed }) => ($completed ? '✓ ' : '○ ')}';
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;