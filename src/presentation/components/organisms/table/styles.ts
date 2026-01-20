// src/presentation/components/organisms/table/styles.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

interface TableCellProps {
  $align?: 'left' | 'center' | 'right';
  $width?: string;
}

export const TableHeaderCell = styled.th<TableCellProps>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[700]};
  text-align: ${({ $align }) => $align || 'left'};
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

export const TableBody = styled.tbody``;

interface TableRowProps {
  $clickable: boolean;
}

export const TableRow = styled.tr<TableRowProps>`
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  ${({ $clickable, theme }) =>
    $clickable &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${theme.colors.neutral[50]};
      }
    `}
`;

export const TableCell = styled.td<TableCellProps>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[900]};
  text-align: ${({ $align }) => $align || 'left'};

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

export const EmptyRow = styled.tr``;

export const EmptyCell = styled.td`
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

export const LoadingCell = styled(EmptyCell)`
  color: ${({ theme }) => theme.colors.primary[500]};
`;