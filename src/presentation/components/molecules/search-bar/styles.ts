// src/presentation/components/molecules/search-bar/styles.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface SearchWrapperProps {
  $fullWidth: boolean;
}

export const SearchWrapper = styled.div<SearchWrapperProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

export const InputWrapper = styled.div<SearchWrapperProps>`
  flex: 1;
  max-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '300px')};
`;