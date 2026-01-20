// src/presentation/layouts/base/layout/styles.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LayoutBody = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

interface ContentWrapperProps {
  $sidebarOpen: boolean;
}

export const ContentWrapper = styled.main<ContentWrapperProps>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px);
  transition: margin-left ${({ theme }) => theme.transitions.normal};

  /* 사이드바 열림 상태에 따른 마진 */
  ${({ $sidebarOpen }) =>
    $sidebarOpen
      ? css`
          margin-left: 0;
        `
      : css`
          margin-left: 0;
        `}
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const PageDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;