// src/presentation/styles/global.ts
import { css, Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  /* Pretendard 폰트 로드 */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fontFamily.base};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.neutral[900]};
    background-color: ${theme.colors.background};
    min-height: 100vh;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.neutral[100]};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.neutral[300]};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.neutral[400]};
    }
  }

  /* 선택 영역 스타일 */
  ::selection {
    background-color: ${theme.colors.primary[100]};
    color: ${theme.colors.primary[900]};
  }

  /* 포커스 아웃라인 기본 스타일 */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* 링크 기본 스타일 */
  a {
    color: ${theme.colors.primary[600]};
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primary[700]};
    }
  }

  /* 헤딩 스타일 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
    color: ${theme.colors.neutral[900]};
  }

  h1 {
    font-size: ${theme.typography.fontSize['3xl']};
  }
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
  }
  h3 {
    font-size: ${theme.typography.fontSize.xl};
  }
  h4 {
    font-size: ${theme.typography.fontSize.lg};
  }

  /* 코드 스타일 */
  code {
    font-family: ${theme.typography.fontFamily.mono};
    font-size: 0.875em;
    background-color: ${theme.colors.neutral[100]};
    padding: 2px 6px;
    border-radius: ${theme.borderRadius.sm};
  }

  /* 비활성화 상태 공통 스타일 */
  [disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;