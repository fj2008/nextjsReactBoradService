// src/pages/posts/index.tsx
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BaseLayout } from '@layouts/index';
import { Button } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { Table, Pagination, TableColumn } from '@components/organisms';
import { useGetPosts } from '@hooks/api';
import { usePostFilterStore } from '@store/index';
import { Post } from '@infrastructure/api/post/types';

export default function PostList(): ReactElement {
  const router = useRouter();

  // Zustand에서 필터 상태 가져오기
  const { keyword, page, limit, setKeyword, setPage } = usePostFilterStore();

  // TanStack Query로 데이터 fetching
  const { data, isLoading, isError } = useGetPosts({ page, limit, keyword });

  // 테이블 컬럼 정의
  const columns: TableColumn<Post>[] = [
    {
      key: 'id',
      header: '번호',
      width: '80px',
      align: 'center',
    },
    {
      key: 'title',
      header: '제목',
      render: (row) => <TitleText>{row.title}</TitleText>,
    },
    {
      key: 'author',
      header: '작성자',
      width: '120px',
      align: 'center',
    },
    {
      key: 'createdAt',
      header: '작성일',
      width: '120px',
      align: 'center',
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: 'views',
      header: '조회수',
      width: '100px',
      align: 'center',
      render: (row) => <span>{row.views.toLocaleString()}</span>,
    },
  ];

  // 날짜 포맷팅
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 이벤트 핸들러
  const handleSearch = useCallback(
    (value: string): void => {
      setKeyword(value);
    },
    [setKeyword]
  );

  const handleRowClick = useCallback(
    (row: Post): void => {
      router.push(`/posts/${row.id}`);
    },
    [router]
  );

  const handlePageChange = useCallback(
    (newPage: number): void => {
      setPage(newPage);
    },
    [setPage]
  );

  const handleWriteClick = useCallback((): void => {
    router.push('/posts/write');
  }, [router]);

  // 에러 처리
  if (isError) {
    return (
      <BaseLayout userName="홍길동">
        <ErrorMessage>데이터를 불러오는데 실패했습니다.</ErrorMessage>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout userName="홍길동">
      <PageHeader>
        <TitleRow>
          <Title>게시판</Title>
          <Button variant="primary" onClick={handleWriteClick}>
            글쓰기
          </Button>
        </TitleRow>
        <Description>
          {data
            ? `전체 ${data.pagination.totalCount}개의 게시글`
            : '게시글을 불러오는 중...'}
        </Description>
      </PageHeader>

      {/* 검색 영역 */}
      <SearchSection>
        <SearchBar
          value={keyword}
          onChange={setKeyword}
          onSearch={handleSearch}
          placeholder="제목, 작성자, 내용 검색..."
        />
      </SearchSection>

      {/* 테이블 */}
      <TableSection>
        <Table
          columns={columns}
          data={data?.posts ?? []}
          rowKey={(row) => row.id}
          onRowClick={handleRowClick}
          isLoading={isLoading}
          emptyMessage={
            keyword
              ? `'${keyword}' 검색 결과가 없습니다.`
              : '게시글이 없습니다.'
          }
        />
      </TableSection>

      {/* 페이지네이션 */}
      {data && data.pagination.totalPages > 1 && (
        <PaginationSection>
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </PaginationSection>
      )}
    </BaseLayout>
  );
}

// Styled Components
const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const SearchSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TableSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleText = styled.span`
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.error[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;