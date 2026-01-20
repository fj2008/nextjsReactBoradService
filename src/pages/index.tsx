// src/pages/index.tsx
import type { ReactElement } from 'react';
import styled from '@emotion/styled';
import { BaseLayout } from '@layouts/index';

export default function Home(): ReactElement {
  return (
    <BaseLayout userName="홍길동">
      <PageContent>
        <Title>홈</Title>
        <Description>게시판 튜토리얼에 오신 것을 환영합니다!</Description>

        <Card>
          <CardTitle>📋 게시판</CardTitle>
          <CardDescription>
            게시글을 확인하고 작성할 수 있습니다.
          </CardDescription>
        </Card>

        <Card>
          <CardTitle>✅ 완료된 단계</CardTitle>
          <CardDescription>
            <ul>
              <li>1단계: 스타일링 시스템 (Emotion)</li>
              <li>2단계: Atoms 컴포넌트</li>
              <li>3단계: Molecules & Organisms</li>
              <li>4단계: 레이아웃 시스템 ← 현재</li>
            </ul>
          </CardDescription>
        </Card>
      </PageContent>
    </BaseLayout>
  );
}

// Styled Components
const PageContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const CardDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[600]};

  ul {
    margin-top: ${({ theme }) => theme.spacing[2]};
    padding-left: ${({ theme }) => theme.spacing[4]};
    list-style: disc;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
`;